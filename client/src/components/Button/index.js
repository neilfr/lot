import React from "react";
import "./style.css";

function Button(props) {
  return (
    <button className="btnMargin btn btn-primary" onClick={props.onClick}>
      {props.label}
    </button>
  );
}

export default Button;
