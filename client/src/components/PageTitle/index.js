import React from "react";
import "./style.css";

function PageTitle({ children }) {
  return <h1 className="pageTitleMargin bg-primary text-white">{children}</h1>;
}
// className="bg-primary text-white"
// style={{ paddingLeft: "1em" }}
export default PageTitle;
