import React, { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import { useCurrentUserContext } from "../Contexts/currentUserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("");
  const [errorText, setErrorText] = useState("");
  const history = useHistory();
  const [state, dispatch] = useCurrentUserContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "/api/sessions",
      headers: { Authorization: `Bearer ${localStorage.token}` },
      data: { email: email, password: password },
    })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("token", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          dispatch({ type: "SET_CURRENT_USER_INFO", payload: response.data });
          history.push("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorType(error.response.status);
        setErrorText(error.response.statusText);
      });
  };

  return (
    <div className="container">
      <Card className="card-component">
        <Card.Header>Log In:</Card.Header>
        <Card.Body
          style={{
            backgroundColor: "#09191b",
            color: "#23cb87",
            fontWeight: "bold",
            display: "inline",
            padding: "1rem",
          }}
        >
          <Form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Form.Group>
            <div>
              <span style={{ color: "red" }}>
                {errorType} {errorText}
              </span>
            </div>
            <div style={{ flex: "auto" }}>
              <Button
                variant="outline-light"
                type="submit"
                style={{
                  textColor: "#23cb87",
                  fontWeight: "bold",
                  display: "inline",
                  margin: "1rem",
                }}
              >
                Login
              </Button>
              <Button
                variant="outline-light"
                type="submit"
                href={`/forgot_password`}
                style={{
                  textColor: "#23cb87",
                  fontWeight: "bold",
                  display: "inline",
                  margin: "1rem",
                }}
              >
                Forgot Password?
              </Button>
            </div>
          </Form>

          {/* <Link variant="light"
              to={`/forgot_password`}
            >
              Forgot your password?
            </Link> */}
        </Card.Body>
      </Card>
    </div>
  );
}
