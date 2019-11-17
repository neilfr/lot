import React from "react";
import "./style.css";

function LotForm(props) {
  if (!props.lot) {
    return <div>Select a lot</div>;
  } else {
    return (
      <div>
        <div className="grid-container bg-primary text-white">
          <label className="grid-item-left">Name:</label>
          <input
            className="grid-item-right"
            name="name"
            type="text"
            defaultValue={props.lot.name}
            onChange={props.onChange}
          />
          <label className="grid-item-left">Capacity:</label>
          <input
            className="grid-item-right"
            name="capacity"
            type="number"
            defaultValue={props.lot.capacity}
            onChange={props.onChange}
            min="0"
          />
          <label className="grid-item-left">Departure Leeway:</label>
          <input
            className="grid-item-right"
            name="departureLeeway"
            type="number"
            defaultValue={props.lot.departureLeeway}
            onChange={props.onChange}
            min="5"
          />
        </div>
        <div className="flex-container">
          <button className="btn btn-primary" onClick={props.updateLotEntry}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={props.cancelClick}>
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              props.deleteClick(props.lot);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
export default LotForm;
