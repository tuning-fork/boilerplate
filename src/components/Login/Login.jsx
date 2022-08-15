import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Container from "../design/Container/Container";
import LoginForm from "./LoginForm";
import NavbarLoginForm from "./NavbarLoginForm";
import { useCurrentUser } from "../../contexts/currentUserContext";
import "./Login.css";

export default function Login(props) {
  const history = useHistory();
  const location = useLocation();
  const { login } = useCurrentUser();

  const handleCancel = (event) => {
    event.preventDefault();
    props.onCancel();
    history.push(`/splashpage`);
  };

  const handleSubmit = useCallback(
    async ({ email, password }) => {
      await login(email, password);
      alert("You're signed in!");
      history.push(location.state?.from ?? "/organizations");
    },
    [history, location, login]
  );

  return (
    <>
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
          onCancel={handleCancel}
          toggleModalContents={props.toggleModalContents}
        />
      )}
    </>
  );
}
