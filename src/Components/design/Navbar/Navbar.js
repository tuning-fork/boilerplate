import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "../Button/Button";
//Will need a reusable user icon
//Will need a logotype svg

import "./Navbar.css";

export default function Navbar(props) {
  return (
    <div className={clsx(props.className, "navbar")}>
      <NavLink
        className="navbar__navitem orgselectlink"
        activeClassName="navbar__navitem--selected"
        to={`/organizations/${props.organizationId}/dashboard`}
      >
        All Organizations
      </NavLink>
      <div className="navbar__navitem"> | </div>
      <div className="navbar__navitem">Baklava Foundation</div>
      <Button className="button--usericon">JW</Button>
      {/* <div className="userlogo"></div> */}
    </div>
  );
}

Navbar.propTypes = {
  className: PropTypes.string,
};

Navbar.defaultProps = {};
