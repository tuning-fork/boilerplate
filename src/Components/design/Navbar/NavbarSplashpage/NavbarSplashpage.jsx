import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { ReactComponent as Logo } from "../BOILERPLATE.svg";
import "./NavbarSplashpage.css";
import Button from "../../Button/Button";
import customLogInButton from "./Login_Button_Blank.png";
import customSignUpButton from "./sign_up_button_blank.png";
import PixelBackgroundBlue from "./pixel_background_blue.png";
import PixelBackgroundYellow from "./pixel_background_yellow.png";
import PixelBackgroundPink from "./pixel_background_pink.png";
import "../../Panel/Panel.css";
import { Link } from "react-router-dom";

export default function NavbarSplashpage(props) {
  return (
    <div className={clsx(props.className, "navbar-splashpage")}>
      <Logo className="navbar-splashpage__logo" />
      <div className="navbar__items">
        <div className="navbar__tab-container">
          <img
            src={PixelBackgroundYellow}
            alt="Custom button"
            className="navbar__tab-image"
          />
          <Link to="/team" className="navbar__tab">
            <span className={clsx("navbar__tab-text", "tab-yellow")}>
              Our Team
            </span>
          </Link>
        </div>
        <div className="navbar__tab-container">
          <img
            src={PixelBackgroundBlue}
            alt="Custom button"
            className="navbar__tab-image"
          />
          <Link to="/features" className="navbar__tab">
            <span className={clsx("navbar__tab-text", "tab-blue")}>
              Features
            </span>
          </Link>
        </div>
        <div className="navbar__tab-container">
          <img
            src={PixelBackgroundPink}
            alt="Custom button"
            className="navbar__tab-image"
          />
          <Link to="/contact" className="navbar__tab">
            <span className={clsx("navbar__tab-text", "tab-pink")}>
              Contact
            </span>
          </Link>
        </div>
        <div className="navbar__tab-container">
          <img
            src={customLogInButton}
            alt="Custom button"
            className="navbar__image"
          />
          <Link to="/login" className="navbar__tab">
            <span className={clsx("navbar__tab-text", "tab-login")}>
              Log In
            </span>
          </Link>
        </div>
        <div className="navbar__tab-container">
          <img
            src={customSignUpButton}
            alt="Custom button"
            className="navbar__image"
          />
          <Link to="/signup" className="navbar__tab">
            <span className={clsx("navbar__tab-text", "tab-signup")}>
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

NavbarSplashpage.propTypes = {
  className: PropTypes.string,
};
