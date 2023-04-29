import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../BOILERPLATE.svg";
import "../../Panel/Panel.css";
import "./NavbarSplashpage.css";

export default function NavbarSplashpage(props) {
  return (
    <div className={clsx(props.className, "navbar-splashpage")}>
      <Link to="/">
        <Logo className="navbar-splashpage__logo" />
      </Link>
      <ul className="navbar__items">
        <li className={clsx("navbar__tab", "navbar__tab--yellow")}>
          <Link to="/team" className="navbar__tab-link">
            Our Team
          </Link>
        </li>
        <li className={clsx("navbar__tab", "navbar__tab--blue")}>
          <Link to="/features" className="navbar__tab-link">
            Features
          </Link>
        </li>
        <li className={clsx("navbar__tab", "navbar__tab--pink")}>
          <Link to="/contact" className="navbar__tab-link">
            Contact
          </Link>
        </li>
        <li className={clsx("navbar__tab", "navbar__tab--login")}>
          <Link to="/login" className="navbar__tab-link">
            Log In
          </Link>
        </li>
        <li className={clsx("navbar__tab", "navbar__tab--signup")}>
          <Link to="/signup" className="navbar__tab-link">
            Sign Up
          </Link>
        </li>
      </ul>
    </div>
  );
}

NavbarSplashpage.propTypes = {
  className: PropTypes.string,
};
