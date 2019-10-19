import React from "react";
import "./style.css";
import { DeleteBtn } from "../DeleteBtn";

export function LotEntry(props) {
  console.log("Lot Entry props are:", props);
  return (
    <div className="row">
      {/* <li className="list-group-item col-10" onClick={props.setCurrentLogEntry}> */}
      <li
        className="list-group-item col-10"
        onClick={props.setCurrentLot}
        value={props.value}
      >
        Name:{props.name}
        <br />
        Capacity:{props.capacity}
        <br />
      </li>
      {/* <DeleteBtn onClick={props.deleteConsumptionLogEntry} className="col" /> */}
    </div>
  );
}
