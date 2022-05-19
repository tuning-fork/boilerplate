import React from "react";
import Button from "../design/Button/Button";
import customLogInButton from "./Login_Button_Blank.png";
import customSignUpButton from "./sign_up_button_blank.png";
import PixelBackgroundBlue from "./pixel_background_blue.png";
import PixelBackgroundYellow from "./pixel_background_yellow.png";
import PixelBackgroundPink from "./pixel_background_pink.png";
import "./NavbarLoginForm.css";
import clsx from "clsx";

export default function NavbarLoginForm(props) {
  return (
    <>
      <div className="navbar__items">
        <div className="navbar__tab-container">
          <img
            src={PixelBackgroundYellow}
            alt="Custom button"
            className="navbar__tab-image"
          />
          <Button
            variant="none"
            onClick={() => props.toggleModalContents("Log In")}
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
            onClick={() => props.toggleModalContents("Log In")}
            className="navbar__tab"
          >
            <div className={clsx("navbar__tab-text", "tab-blue")}>
              Try It Out
            </div>
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
            onClick={() => props.toggleModalContents("Log In")}
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
            classname="navbar__button"
          >
            <div className={clsx("navbar__tab-text", "tab-signup")}>
              Sign Up
            </div>
          </Button>
        </div>
        {/* <Button
          variant="none"
          onClick={() => props.toggleModalContents("Log In")}
          className="navbar__button"
        >
          <img
            src={customLogInButton}
            alt="Custom button"
            className="navbar__image"
          />
        </Button>
        <Button
          variant="none"
          onClick={() => props.toggleModalContents("Sign Up")}
          classname="navbar__button"
        >
          <img
            src={customSignUpButton}
            alt="Custom button"
            className="navbar__image"
          />
        </Button> */}
      </div>
    </>
  );
}
