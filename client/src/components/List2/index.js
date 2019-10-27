import React from "react";
import "./style.css";

// This file exports both the List and ListItem components

export function List2({ children }) {
  return (
    <div className="test">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

// className="list-overflow-container"
export function ListItem2({ children }) {
  return <li className="list-group-item">{children}</li>;
}
