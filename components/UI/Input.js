import React from "react";

// eslint-disable-next-line react/display-name
const Input = React.forwardRef((props, ref) => {
  return <input className={props.className} ref={ref} {...props} />;
});

export default Input;
