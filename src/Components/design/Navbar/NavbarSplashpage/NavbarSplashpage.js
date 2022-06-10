import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { ReactComponent as Logo } from "../BOILERPLATE.svg";
import Login from "../../../Login/Login";
import "./NavbarSplashPage.css";

export default function NavbarSplashPage(props) {
  return (
    <div className={clsx(props.className, "navbar-SplashPage")}>
      <Logo className="navbar-SplashPage__logo" />
      <Login
        formType="navbar"
        toggleModalContents={props.toggleModalContents}
      />
    </div>
  );
}

NavbarSplashPage.propTypes = {
  className: PropTypes.string,
  // user: PropTypes.object.isRequired,
  // organizationName: PropTypes.string,
};

NavbarSplashPage.defaultProps = {};
