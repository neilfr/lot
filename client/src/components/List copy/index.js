import React from "react";
import "./style.css";

function List({ children }) {
  return (
    <div>
      <ul>{children}</ul>
    </div>
  );
}

export default List;
