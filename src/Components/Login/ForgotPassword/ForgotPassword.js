import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const forgotPassword = (email) => {
    axios
      .post("/api/forgot_password", { email: email })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    forgotPassword(email);
    setEmail("");
  };

  // const [loginFields, setLoginFields] = useState({});
  // const location = useLocation();
  // const { error } = useCurrentUser();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setLoginFields({ ...loginFields });
  //   props.onSubmit(loginFields);
  // };

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
      {/* <form onSubmit={handleSubmit} className="login-form">
        <TextBox
          type="email"
          name="email"
          labelText="Email"
          placeholder="Your email here"
          value={loginFields.email}
          onChange={(event) =>
            setLoginFields({
              ...loginFields,
              email: event.target.value,
            })
          }
          required
        />
        <TextBox
          type="password"
          name="password"
          labelText="Password"
          placeholder="Your password here"
          value={loginFields.password}
          onChange={(event) =>
            setLoginFields({
              ...loginFields,
              password: event.target.value,
            })
          }
          required
        />
        <div className="login-form__actions">
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
        </div>
      </form> */}
    </div>
  );
}
