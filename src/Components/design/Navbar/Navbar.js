import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "../Button/Button";
import { ReactComponent as Logo } from "./BOILERPLATE.svg";
import "./Navbar.css";

export default function Navbar(props) {
  return (
    <div className={clsx(props.className, "navbar")}>
      <Logo className="navbar__logo" />
      <div className="navbar__links">
        <NavLink
          to={`/organizations/${props.organizationId}/dashboard`}
          className="navbar__all-organizations"
        >
          {"<"} All Organizations
        </NavLink>
        <span className="navbar__divider"> | </span>
        <span className="navbar__current-organization">Baklava Foundation</span>
        <Button className="button" variant="usericon">
          JW
        </Button>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  className: PropTypes.string,
};

Navbar.defaultProps = {};
