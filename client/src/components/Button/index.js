import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function Button(props) {
  return (
    <button className="btnMargin btn btn-primary" onClick={props.onClick}>
      {props.label}
    </button>
    // <span className="add-btn" {...props} role="button" tabIndex="0">
    //   +
    // </span>
  );
}

export default Button;
