import React from "react";
import "./style.css";
import { DeleteBtn } from "../DeleteBtn";

export function FeeTier(props) {
  console.log("FeeTier props are:", props);
  return (
    <div className="row">
      <p>
        {" "}
        Elapsed Minutes:
        <input
          type="number"
          defaultValue={props.feeTier.elapsedMinutes}
          onChange={props.onChange}
        />
      </p>
      <p>
        Fee:
        <input
          type="number"
          defaultValue={props.feeTier.fee}
          step="0.01"
          onChange={props.onChange}
        />
      </p>
    </div>
  );
}
