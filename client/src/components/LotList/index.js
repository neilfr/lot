import React from "react";
import "./style.css";
// import "../LotEntry";

// This file exports both the List and ListItem components

function LotList({ children }) {
  return (
    <div>
      <ul>{children}</ul>
    </div>
  );
}

export default LotList;
