import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Container from "../design/Container/Container";
import { useCurrentUser } from "../../Contexts/currentUserContext";
import LoginForm from "./LoginForm";
import NavbarLoginForm from "./NavbarLoginForm";
import "./Login.css";

export default function Login(props) {
  const history = useHistory();
  const location = useLocation();
  const { login, state } = useCurrentUser();

  const handleCancel = (event) => {
    event.preventDefault();
    props.onCancel();
    history.push(`/splashpage`);
  };

  const handleSubmit = useCallback(
    async ({ email, password }) => {
      // event.preventDefault();
      await login(email, password);
      console.log("Login user info", state);
      // alert("You're signed in!");
      history.push(location.state?.from ?? "/org_select");
    },
    [history, location, login, state]
  );

  return (
    <>
      {/* <h1 className="login">Login</h1> */}
      {props.formType === "standard" ? (
        <div className="login">
          <Container as="section" centered>
            <LoginForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              toggleModalContents={props.toggleModalContents}
            />
          </Container>
        </div>
      ) : (
        <NavbarLoginForm
          onSubmit={handleSubmit}
          toggleModalContents={props.toggleModalContents}
        />
      )}
    </>
  );
}
