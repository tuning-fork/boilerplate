import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { ReactComponent as Logo } from "../BOILERPLATE.svg";
import "./NavbarSplashpage.css";
import NavbarLogin from "../NavbarLogin/NavbarLogin";

export default function NavbarSplashpage(props) {
  return (
    <div className={clsx(props.className, "navbar-splashpage")}>
      <Logo className="navbar-splashpage__logo" />
      <NavbarLogin />
    </div>
  );
}

NavbarSplashpage.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  organizationName: PropTypes.string,
};

NavbarSplashpage.defaultProps = {};
