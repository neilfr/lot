import React from "react";
import "./style.css";

// had to add 'key' to component to get it to render on parent state change
function ArrivalCard(props) {
  console.log("props is: ", props);
  return (
    <div>
      <div className="grid-container bg-primary text-white">
        <label className="grid-item">Vacancies:</label>
        <input
          key={props.vacancies}
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
