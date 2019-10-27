import React from "react";
import "./style.css";

function FeeFormula(props) {
  return props.feeFormula ? (
    <ul>
      {props.feeFormula.map((feeTier, index) => (
        <li key={index}>{feeTier.description}</li>
      ))}
    </ul>
  ) : (
    <div>No Fee Formula</div>
  );
}
export default FeeFormula;
