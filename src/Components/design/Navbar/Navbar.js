import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
//Will need a reusable user icon
//Will need a logotype svg

import "./Navbar.css";

export default function Navbar(props) {
  return (
    <div className={clsx(props.className, "sidebar")}>
      <NavLink
        className="navbar__navitem"
        activeClassName="navbar__navitem--selected"
        to={`/organizations/${props.organizationId}/dashboard`}
      >
        All Organizations
      </NavLink>
      <div>Baklava Foundation</div>
      {/* <div className="userlogo"></div> */}
    </div>
  );
}

Navbar.propTypes = {
  className: PropTypes.string,
};

Navbar.defaultProps = {};
