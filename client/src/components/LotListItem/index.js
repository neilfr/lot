import React from "react";
import "./style.css";

function LotListItem(props) {
  return (
    <div className="row">
      <li className="list-group-item col-10" onClick={props.onClick}>
        {props.lot.name}
        <br />
      </li>
    </div>
  );
}

export default LotListItem;
