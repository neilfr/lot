import React from "react";
import "./style.css";
import "../LotEntry";

// This file exports both the List and ListItem components

export function LotList({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

export function ListItem({ children }) {
  return <li className="list-group-item">{children}</li>;
}
