import React from "react";
import "./style.css";

export function FeeFormula(props) {
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
