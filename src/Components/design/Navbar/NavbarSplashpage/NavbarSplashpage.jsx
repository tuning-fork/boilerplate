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
          <Button
            variant="none"
            onClick={() => props.togglePanelContents("Our Team")}
            className="navbar__tab"
          >
            <dt className={clsx("navbar__tab-text", "tab-yellow")}>Our Team</dt>
          </Button>
        </div>
        <div className="navbar__tab-container">
          <img
            src={PixelBackgroundBlue}
            alt="Custom button"
            className="navbar__tab-image"
          />
          <Button
            variant="none"
            onClick={() => props.togglePanelContents("Features")}
            className="navbar__tab"
          >
            <div className={clsx("navbar__tab-text", "tab-blue")}>Features</div>
          </Button>
        </div>
        <div className="navbar__tab-container">
          <img
            src={PixelBackgroundPink}
            alt="Custom button"
            className="navbar__tab-image"
          />
          <Button
            variant="none"
            onClick={() => props.togglePanelContents("Contact")}
            className="navbar__tab"
          >
            <div className={clsx("navbar__tab-text", "tab-pink")}>Contact</div>
          </Button>
        </div>
        <div className="navbar__tab-container">
          <img
            src={customLogInButton}
            alt="Custom button"
            className="navbar__image"
          />
          <Button
            variant="none"
            onClick={() => props.toggleModalContents("Log In")}
            className="navbar__tab"
          >
            <div className={clsx("navbar__tab-text", "tab-login")}>Log In</div>
          </Button>
        </div>
        <div className="navbar__tab-container">
          <img
            src={customSignUpButton}
            alt="Custom button"
            className="navbar__image"
          />
          <Button
            variant="none"
            onClick={() => props.toggleModalContents("Sign Up")}
            className="navbar__button"
          >
            <div className={clsx("navbar__tab-text", "tab-signup")}>
              Sign Up
            </div>
          </Button>
        </div>
        {/* <div className="navbar__tab-container">
          <img
            src={customSignUpButton}
            alt="Custom button"
            className="navbar__image"
          />
          <Button
            variant="none"
            onClick={() => props.togglePanelContents("Contact")}
            className={clsx("navbar__tab-text", "tab-signup", "navbar__button")}
            href="#slice"
            data-hover="Slice"
          >
            <div className={clsx("navbar__button", "menu__link")}>
              Test Slice
            </div>
          </Button>
        </div> */}
      </div>
    </div>
  );
}

NavbarSplashpage.propTypes = {
  className: PropTypes.string,
  // user: PropTypes.object.isRequired,
  // organizationName: PropTypes.string,
};

NavbarSplashpage.defaultProps = {};
