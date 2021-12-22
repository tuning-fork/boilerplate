import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import UserIcon from "../../Helpers/UserIcon";
import Button from "../Button/Button";
import { ReactComponent as Logo } from "./BOILERPLATE.svg";
import "./Navbar.css";

export default function Navbar(props) {
  return (
    <div className={clsx(props.className, "navbar")}>
      <Logo className="navbar__logo" />
      <div className={clsx(props.className, "navbar__links")}>
        {props.organizationName && (
          <>
            <Link to="/organizations" className="navbar__all-organizations">
              {"<"} All Organizations
            </Link>
            <span className="navbar__divider"> | </span>
            <span>{props.organizationName}</span>
          </>
        )}
        <Button
          variant="none"
          aria-label="Go to your account settings"
          className="navbar__user-icon"
        >
          <UserIcon
            firstName={props.user.first_name}
            lastName={props.user.last_name}
          />
        </Button>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  organizationName: PropTypes.string,
};
