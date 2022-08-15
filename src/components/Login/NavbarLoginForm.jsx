import React, { useState } from "react";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import customLogInButton from "./Log_In_Button_Image.png";
import "./NavbarLoginForm.css";
import { useCurrentUser } from "../../contexts/currentUserContext";

export default function NavbarLoginForm(props) {
  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });
  const { error } = useCurrentUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginFields({ ...loginFields });
    props.onSubmit(loginFields);
  };

  return (
    <>
      {error && <p className="login__error">Error: {error.message}</p>}
      <form className="navbar-login__form" onSubmit={handleSubmit}>
        <div>
          <TextBox
            className="navbar-login__inputs navbar-login__items"
            placeholderText="Email"
            onChange={(event) =>
              setLoginFields({ ...loginFields, email: event.target.value })
            }
            required
            margin="basic"
          />
          <Button
            className="navbar-login__inputs navbar-login__items navbar-login__captions"
            variant="none"
            onClick={() => props.toggleModalContents("Sign Up")}
          >
            Sign Up
          </Button>
        </div>
        <div>
          <TextBox
            className="navbar-login__inputs navbar-login__items"
            placeholderText="Password"
            onChange={(event) =>
              setLoginFields({ ...loginFields, password: event.target.value })
            }
            required
            margin="basic"
            type="password"
          />
          <Button
            variant="none"
            className="navbar-login__inputs navbar-login__items navbar-login__captions"
            onClick={() => props.toggleModalContents("Forgot Password")}
          >
            Forgot Password?
          </Button>
        </div>
        <div className="navbar-login__actions navbar-login__items">
          <Button variant="none" type="submit">
            <img
              src={customLogInButton}
              alt="Custom button"
              className="navbar-login__image"
            />
          </Button>
        </div>
      </form>
    </>
  );
}
