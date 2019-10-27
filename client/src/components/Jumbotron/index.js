import React from "react";
import "./style.css";

function Jumbotron({ children }) {
  return <h1 className="bg-primary text-white">{children}</h1>;
}

export default Jumbotron;
