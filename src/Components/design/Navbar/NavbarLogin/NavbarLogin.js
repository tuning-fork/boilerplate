import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Button from "../../Button/Button";
import "./NavbarLogin.css";
import TextBox from "../../TextBox/TextBox";
import customLogInButton from "./Log_In_Button_Image.png";
import { useCurrentUser } from "../../../../Contexts/currentUserContext";

export default function NavbarLogin() {
  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });
  const { error, login } = useCurrentUser();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    (async () => {
      await login(loginInputs.email, loginInputs.password);
      history.push(location.state?.from ?? "/org_select");
    })();
  };

  return (
    <>
      {error && <p className="login__error">Error: {error.message}</p>}
      <form onSubmit={handleSubmit} className="navbar-login__form">
        <TextBox
          className="navbar-login__inputs navbar-login__items"
          placeholderText="Email"
          onChange={(event) =>
            setLoginInputs({ ...loginInputs, email: event.target.value })
          }
          required
          margin="basic"
        />
        <TextBox
          className="navbar-login__inputs navbar-login__items"
          placeholderText="Password"
          onChange={(event) =>
            setLoginInputs({ ...loginInputs, password: event.target.value })
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
        </div>
      </form>
    </>
  );
}
