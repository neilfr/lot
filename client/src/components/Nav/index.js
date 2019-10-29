import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-* navbar-dark bg-primary">
      {/* <a className="navbar-brand">Funky Lots</a> */}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li
            className="nav-item"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
          >
            <Link className="nav-link" to="/admin">
              Admin
            </Link>
          </li>
          <li
            className="nav-item"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
          >
            <Link className="nav-link" to="/arrival">
              Arrival
            </Link>
          </li>
          <li
            className="nav-item"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
          >
            <Link className="nav-link" to="/payment">
              Payment
            </Link>
          </li>
          <li
            className="nav-item"
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
          >
            <Link className="nav-link" to="/departure">
              Departure
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
