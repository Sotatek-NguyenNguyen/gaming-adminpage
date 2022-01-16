import React, { useEffect } from "react";
import useInputNumber from "../../hooks/useInputNumber";

// eslint-disable-next-line react/display-name
const Input = React.forwardRef((props, ref) => {
  const [value, handleChange, setVal] = useInputNumber("");

  useEffect(() => {
    setVal(props.value);
  }, [setVal, props.value]);

  useEffect(() => {
    if(props.refresh !== 0){
      setVal('');
    }
  }, [props.resetvalue])

  const onChange = (e) => {
    props.onChange();
    handleChange(e);
  };

  const styleErrorValue = {
    ...props.style,
    borderColor: props.error ? "red" : "#9F99B3",
  };

  return (
    <div>
      {props.type === "number" ? (
        <input
          className={props.className}
          ref={ref}
          {...props}
          value={value}
          onChange={onChange}
          type="text"
          style={styleErrorValue}
        />
      ) : (
        <input
          className={props.className}
          ref={ref}
          {...props}
          style={styleErrorValue}
        />
      )}
      {props.error ? <span className="text-error">{props.error}</span> : ""}
    </div>
  );
});

Input.defaultProps = {
  onChange: () => {},
};

export default Input;
