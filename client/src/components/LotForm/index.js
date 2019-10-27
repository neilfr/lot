import React from "react";

function LotForm(props) {
  console.log("props is: ", props);
  if (!props.lot) {
    return <div>Select a lot</div>;
  } else {
    return (
      <div>
        <br />
        Name
        <input
          name="name"
          type="text"
          defaultValue={props.lot.name}
          onChange={props.onChange}
        />
        <br />
        Capacity
        <input
          name="capacity"
          type="number"
          defaultValue={props.lot.capacity}
          onChange={props.onChange}
          min="0"
        />
        <br />
        Departure Leeway
        <input
          name="departureLeeway"
          type="number"
          defaultValue={props.lot.departureLeeway}
          onChange={props.onChange}
          min="5"
        />
        <br />
        <button onClick={props.updateLotEntry}>Save</button>
        <button onClick={props.cancelClick}>Cancel</button>
        <button
          onClick={() => {
            props.deleteClick(props.lot);
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}
export default LotForm;
