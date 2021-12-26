import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== passwordConfirmation) {
      alert("Passwords don't match");
      setPassword("");
      setPasswordConfirmation("");
    } else {
      resetPassword({
        password,
        token,
        email,
      });
      setToken("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      history.push("/login");
    }
  };

  const resetPassword = (credentials) => {
    axios
      .post("api/reset_password", credentials)
      .then((response) => {
        if (response) {
          alert(response.data.message);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <Card>
        <Card.Header>
          <p>Reset Password:</p>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label for="token">Token:</Form.Label>
              <Form.Control
                required
                id="token"
                onChange={(event) => setToken(event.target.value)}
                name="token"
                placeholder="token"
                type="token"
                value={token}
              />
              <p>The code that was emailed to you. This is case-sensitive.</p>
            </Form.Group>
            <Form.Group>
              <Form.Label for="email">Email:</Form.Label>
              <Form.Control
                required
                id="email"
                onChange={(event) => setEmail(event.target.value)}
                name="email"
                placeholder="email"
                type="email"
                value={email}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label for="password">New password:</Form.Label>
              <Form.Control
                required
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                name="password"
                placeholder="password"
                type="password"
                value={password}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label for="passwordConfirmation">
                Confirm new password:
              </Form.Label>
              <Form.Control
                required
                id="passwordConfirmation"
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
                name="passwordConfirmation"
                placeholder="password confirmation"
                type="password"
                value={passwordConfirmation}
              />
              <Button type="secondary">Reset Password</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
