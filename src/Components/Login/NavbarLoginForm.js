import React from "react";
import Button from "../design/Button/Button";
import customLogInButton from "./Log_In_Button_Image.png";
import customSignUpButton from "./sign_up_button_image.png";
import PixelBackgroundBlue from "./pixel_background_blue.png";
import PixelBackgroundYellow from "./pixel_background_yellow.png";
import PixelBackgroundPink from "./pixel_background_pink.png";
import "./NavbarLoginForm.css";

export default function NavbarLoginForm(props) {
  return (
    <>
      <div className="navbar__items">
        <div className="navbar__tab__container">
          <img
            src={PixelBackgroundYellow}
            alt="Custom button"
            className="navbar__tab__image"
          />
          <Button
            variant="none"
            onClick={() => props.toggleModalContents("Log In")}
            className="navbar__tab"
          >
            <dt className="navbar__tab__text">Our Team</dt>
          </Button>
        </div>

        <div className="navbar__tab__container">
          <img
            src={PixelBackgroundBlue}
            alt="Custom button"
            className="navbar__tab__image"
          />
          <Button
            variant="none"
            onClick={() => props.toggleModalContents("Log In")}
            className="navbar__tab"
          >
            <div className="navbar__tab__text">Try It Out</div>
          </Button>
        </div>
        <div className="navbar__tab__container">
          <img
            src={PixelBackgroundPink}
            alt="Custom button"
            className="navbar__tab__image"
          />
          <Button
            variant="none"
            onClick={() => props.toggleModalContents("Log In")}
            className="navbar__tab"
          >
            <div className="navbar__tab__text">Say Hi!</div>
          </Button>
        </div>
        {/* <Button
          variant="none"
          onClick={() => props.toggleModalContents("Log In")}
          className="navbar__tab"
        >
          <img
            src={PixelBackgroundYellow}
            alt="Custom button"
            className="navbar__image"
          />
        </Button>
        <Button
          variant="none"
          onClick={() => props.toggleModalContents("Log In")}
          className="navbar__tab"
        >
          <img
            src={PixelBackgroundPink}
            alt="Custom button"
            className="navbar__image"
          />
        </Button> */}
        <Button
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
        </Button>
      </div>
    </>
  );
}
