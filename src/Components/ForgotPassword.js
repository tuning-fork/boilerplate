import React, { Component, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();

  const forgotPassword = (email) => {
    axios
      .post("/api/forgot_password", { email: email })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    forgotPassword(email);
    setEmail("");
  };

  return (
    <div className="container">
      <Card className="basic">
        <Card.Header>
          <p>
            Enter the email address associated with your Boilerplate account
          </p>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Password reset request:</Form.Label>
              <Form.Control
                required
                id="forgotpasswordemail"
                onChange={(event) => setEmail(event.target.value)}
                name="email"
                placeholder="email"
                type="email"
                value={email}
              />
              <Button type="submit" className="basic">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
