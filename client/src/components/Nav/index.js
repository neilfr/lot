import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Admin
      </a>
      <a className="navbar-brand" href="/arrival">
        Arrival
      </a>
      <a className="navbar-brand" href="/payment">
        Payment
      </a>
      <a className="navbar-brand" href="/departure">
        Departure
      </a>
    </nav>
  );
}

export default Nav;
