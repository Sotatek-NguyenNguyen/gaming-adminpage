import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const useClickOutSide = (handler) => {
  const domNode = useRef();

  useEffect(() => {
    const mayberHanler = (event) => {
      if (
        domNode.current &&
        event.target.className !== "dropdown__btn" &&
        event.target.tagName !== "svg" &&
        !domNode.current.contains(event.target)
      )
        handler();
    };

    document.addEventListener("mousedown", mayberHanler);

    return () => document.removeEventListener("mousedown", mayberHanler);
  });

  return domNode;
};

function Dropdown(props, ref) {
  const { options, onChange, className} = props;

  const [isActive, setIsActive] = useState(false);
  const firstOption = options[0].title;
  const [selected, setSelected] = useState(firstOption);

  const handleClick = (e) => {
    setSelected(e.target.textContent);
    setIsActive(false);
    onChange(+e.target.getAttribute('value'))
  };

  useImperativeHandle(ref, () => ({
    // function will call in component parent to reset selected dropdown
    setSelectedToFirstValue() {
      setSelected(firstOption);
    }
  }));

  const SetClassName = ()=>{
    if(className.trim() === '') return 'dropdown';
    return `dropdown ${className}`;
  }

  const domNode = useClickOutSide(() => setIsActive(false));

  return (
    <div className={SetClassName()}>
      <div className="dropdown__btn" onClick={() => setIsActive(true)}>
        {selected}
        {isActive ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>

      {isActive && (
        <div ref={domNode} className="dropdown__content" onClick={handleClick}>
          {options.map((option) => (
            <div
              key={option.value}
              className="dropdown__content-item"
              value={option.value}
            >
              {option.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const forwardedDropdown = React.forwardRef(Dropdown)
export default forwardedDropdown;
