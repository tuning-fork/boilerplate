import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "../Button/Button";
import { ReactComponent as Logo } from "./BOILERPLATE.svg";
import "./Navbar.css";

const getUserInitials = (user) => {
  return `${user?.first_name?.[0]}${user?.last_name?.[0]}`;
};

export default function Navbar(props) {
  return (
    <div className={clsx(props.className, "navbar")}>
      <Logo className="navbar__logo" />
      <div className="navbar__links">
        {props.organizationName && (
          <>
            <NavLink
              to={`/organizations/${props.organizationId}/dashboard`}
              className="navbar__all-organizations"
            >
              {"<"} All Organizations
            </NavLink>
            <span className="navbar__divider"> | </span>
            <span className="navbar__current-organization">
              {props.organizationName}
            </span>
          </>
        )}
        <Button variant="usericon">{getUserInitials(props.user)}</Button>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  organizationName: PropTypes.string,
};

Navbar.defaultProps = {};
