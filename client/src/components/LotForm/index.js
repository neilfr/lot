import React from "react";
import { FeeTier } from "../FeeTier";

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
        <br />
        Departure Leeway
        <input
          name="departureLeeway"
          type="number"
          defaultValue={props.lot.departureLeeway}
          onChange={props.onChange}
        />
        <br />
        <h4>Fee Formula</h4>
        {props.lot.feeFormula.map((feeTier, index) => (
          <div key={index}>
            {console.log("index is:", index)}
            {console.log("feeTier is", feeTier)}
            <FeeTier
              key={index}
              name="feeTier"
              feeTier={feeTier}
              onChange={props.onChange}
            />
            {/* Elapsed Minutes:
            <input
              key={index}
              name="elapsedMinutes"
              type="number"
              defaultValue={props.lot.feeFormula[0].elapsedMinutes}
              onChange={props.onChange}
            />
            Fee:
            <input
              key={index}
              name="fee"
              type="number"
              defaultValue={props.lot.feeFormula[0].fee}
              onChange={props.onChange}
            /> */}
          </div>
        ))}
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
