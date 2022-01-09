import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Container from "../design/Container/Container";
import { useCurrentUser } from "../../Contexts/currentUserContext";
import LoginForm from "./LoginForm";
import "./Login.css";

export default function Login(props) {
  const history = useHistory();
  const location = useLocation();
  const { login } = useCurrentUser();

  const handleCancel = (event) => {
    event.preventDefault();
    props.onCancel();
    history.push(`/landing_page`);
  };

  const handleSubmit = useCallback(
    async ({ email, password }) => {
      // event.preventDefault();
      await login(email, password);
      // console.log("user info", user);
      // alert("You're signed in!");
      history.push(location.state?.from ?? "/org_select");
    },
    [history, location, login]
  );

  return (
    <div className="login">
      <Container as="section" centered>
        {/* <h1 className="login">Login</h1> */}
        <LoginForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          toggleModalContents={props.toggleModalContents}
        />
      </Container>
    </div>
  );
}
