import React from "react";
import "./style.css";

function LotListItem(props) {
  console.log("Lot Entry props are:", props);
  return (
    <div className="row">
      {/* <li className="list-group-item col-10" onClick={props.setCurrentLogEntry}> */}
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

export default LotListItem;
