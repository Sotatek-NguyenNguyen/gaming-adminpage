import React, { useEffect } from "react";
import useInputNumber from "../../hooks/useInputNumber";

// eslint-disable-next-line react/display-name
const Input = React.forwardRef((props, ref) => {
  const [value, handleChange, setVal] = useInputNumber("");

  useEffect(() => {
    if (props.value) {
      setVal(props.value);
    }
  }, [setVal, props.value]);

  const onChange = (e) => {
    props.onChange();
    handleChange(e);
  };

  const styleErrorValue = {
    borderColor: props.error ? "red" : "#9F99B3",
  };

  return (
    <div>
      {props.type === "number" ? (
        <input
          className={props.className}
          style={styleErrorValue}
          ref={ref}
          {...props}
          value={value}
          onChange={onChange}
          type="text"
        />
      ) : (
        <input
          className={props.className}
          style={styleErrorValue}
          ref={ref}
          {...props}
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
