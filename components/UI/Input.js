import React from "react";

const Input = React.forwardRef((props, ref) => {
  return <input className={props.className} ref={ref} {...props} />;
});

export default Input;
