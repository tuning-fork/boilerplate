import React, { useState, useEffect, useCallback } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import TextBox from "./design/TextBox/TextBox";
import Button from "./design/Button/Button";
import Container from "./design/Container/Container";
import { useCurrentUser } from "../Contexts/currentUserContext";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const location = useLocation();
  const { login, error } = useCurrentUser();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      await login(email, password);
      history.push(location.state?.from ?? "/org_select");
    },
    [email, password, history, location, login]
  );

  return (
    <Container as="section" className="login">
      <h1>Log In:</h1>
      {error && <p className="login__error">Error: {error.message}</p>}
      <form onSubmit={handleSubmit}>
        <TextBox
          type="email"
          name="email"
          labelText="Email"
          placeholder="Your email here"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <TextBox
          type="password"
          name="password"
          labelText="Password"
          placeholder="Your password here"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <div className="login__actions">
          <Button type="submit">Login</Button>
          <Button variant="text" to="/forgot_password" as={Link}>
            Forgot Password?
          </Button>
        </div>
      </form>
    </Container>
  );
}
