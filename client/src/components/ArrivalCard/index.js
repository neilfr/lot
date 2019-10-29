import React from "react";
import "./style.css";

// component is not re-rendering despite the fact that the parent state has changed
function ArrivalCard(props) {
  console.log("props is: ", props);
  return (
    <div>
      <div className="grid-container bg-primary text-white">
        <label className="grid-item">Vacancies:</label>
        <input
          className="grid-item"
          name="vacancies"
          type="text"
          defaultValue={props.vacancies}
          readOnly
        />
        <label className="grid-item">Ticket #:</label>
        <input
          className="grid-item"
          name="ticket"
          type="text"
          defaultValue={props.ticket}
          readOnly
        />
        <label className="grid-item">Arrived at:</label>
        <input
          className="grid-item"
          name="arrival"
          type="text"
          defaultValue={props.arrival}
          readOnly
        />
      </div>
    </div>
  );
}

export default ArrivalCard;
