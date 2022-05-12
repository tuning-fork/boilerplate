import React from "react";
import Button from "../design/Button/Button";
import customLogInButton from "./Log_In_Button_Image.png";
import customSignUpButton from "./sign_up_button_image.png";
import "./NavbarLoginForm.css";

export default function NavbarLoginForm(props) {
  return (
    <>
      <div className="navbar__items">
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
