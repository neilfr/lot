import React from "react";
import "./style.css";

function PageTitle({ children }) {
  return <h1 className="pageTitleMargin bg-primary text-white">{children}</h1>;
}
export default PageTitle;
