import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export default function Signup(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [active, setActive] = useState(true);
  const [errors, setErrors] = useState("");
  const [errorType, setErrorType] = useState("");
  const [errorText, setErrorText] = useState("");
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "/api/users",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          active: true,
          password: password,
          password_confirmation: passwordConfirmation,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )

      .then((response) => {
        if (response.data.message === "User created successfully") {
          history.push("/login");
        }
      })
      .catch((error) => {
        // setErrors(error.response.data.errors);
        setErrorType(error.response.status);
        setErrorText(error.response.statusText);
        console.log(errors);
      });
    event.preventDefault();
  };

  return (
    <div className="container">
      <Card className="basic">
        <Card.Header>Sign Up As A New User!</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                name="passwordConfirmation"
                placeholder="Password Confirmation"
                value={passwordConfirmation}
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
                required
              />
            </Form.Group>
            <div>
              {/* {errors.map((error, index) => {
                return (
                  <span key={index} style={{ color: "red" }}>
                    {error},{" "}
                  </span>
                );
              })} */}
              <span style={{ color: "red" }}>
                {errorType} {errorText}
              </span>
            </div>
            <div>
              <Button className="basic" type="submit">
                Signup
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
