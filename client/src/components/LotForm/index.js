import React from "react";

export function LotForm(props) {
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
        />
        <button onClick={props.updateLotEntry}>Save</button>
        <button onClick={props.cancelClick}>Cancel</button>
      </div>
    );
  }
}
