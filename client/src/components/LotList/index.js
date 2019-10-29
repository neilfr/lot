import React from "react";
import "./style.css";

function LotList({ children }) {
  return (
    <div className="listBackground">
      <ul>{children}</ul>
    </div>
  );
}

export default LotList;
