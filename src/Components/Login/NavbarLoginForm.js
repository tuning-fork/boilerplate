import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import customLogInButton from "./Log_In_Button_Image.png";
import "./NavbarLoginForm.css";
// import { useCurrentUser } from "../../../Contexts/currentUserContext";

export default function NavbarLoginForm(props) {
  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });
  // const location = useLocation();
  // const { error } = useCurrentUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginFields({ ...loginFields });
    props.onSubmit(loginFields);
  };

  return (
    <>
      {/* {location.state?.loggedOut && <p>Successfully logged out!</p>} */}
      {/* {error && <p className="login__error">Error: {error.message}</p>} */}
      <form onSubmit={handleSubmit} className="navbar-login__form">
        <TextBox
          className="navbar-login__inputs navbar-login__items"
          placeholderText="Email"
          onChange={(event) =>
            setLoginFields({ ...loginFields, email: event.target.value })
          }
          required
          margin="basic"
        />
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
        <div className="navbar-login__actions navbar-login__items">
          <Button variant="none" type="submit">
            <img
              src={customLogInButton}
              alt="Custom button"
              className="navbar-login__image"
            />
          </Button>
          {/* TODO - Need to refactor/redesign navbar login to include options for forgot password and switch to sign up (or open sign up modal). */}
          {/* <div className="login-form__actions">
          <p>
            New to Boilerplate?
            <Button
              className="login-form__signup-toggle"
              variant="none"
              onClick={() => props.toggleModalContents("Sign Up")}
            >
              Create an Account
            </Button>
          </p>
          <Button
            variant="login"
            type="submit"
            className="login-form__login-submit-button"
          >
            Log In
          </Button>
          <Button
            variant="none"
            className="login-form__forgot-password"
            to="/forgot_password"
            as={Link}
          >
            Forgot Password?
          </Button>
        </div> */}
        </div>
      </form>
    </>
  );
}
