import React from "react";
import "./style.css";

export function LotEntry(props) {
  console.log("Lot Entry props are:", props);
  return (
    <div className="row">
      {/* <li className="list-group-item col-10" onClick={props.setCurrentLogEntry}> */}
      {console.log("props is:", props)}
      <li
        className="list-group-item col-10"
        onClick={props.onClick}
        // value={props.value}
      >
        {props.lot.name}
        <br />
        {/* Capacity:{props.capacity}
        <br /> */}
      </li>
      {/* <DeleteBtn onClick={props.deleteConsumptionLogEntry} className="col" /> */}
    </div>
  );
}
