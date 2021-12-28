import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import "./LoginForm.css";
import { useCurrentUser } from "../../Contexts/currentUserContext";

export default function LoginForm(props) {
  const [newLoginFields, setNewLoginFields] = useState({});
  const location = useLocation();
  const { error } = useCurrentUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    setNewLoginFields({ ...newLoginFields });
    props.onSubmit(newLoginFields);
  };

  return (
    <>
      {location.state?.loggedOut && <p>Successfully logged out!</p>}
      {error && <p className="login__error">Error: {error.message}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <TextBox
          type="email"
          name="email"
          labelText="Email"
          placeholder="Your email here"
          value={newLoginFields.email}
          onChange={(event) =>
            setNewLoginFields({
              ...newLoginFields,
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
          value={newLoginFields.password}
          onChange={(event) =>
            setNewLoginFields({
              ...newLoginFields,
              password: event.target.value,
            })
          }
          required
        />
        <div className="login__actions">
          <Button type="submit">Login</Button>
          <Button onClick={props.onCancel}>Cancel</Button>
          <Button variant="text" to="/forgot_password" as={Link}>
            Forgot Password?
          </Button>
        </div>
      </form>
    </>
  );
}
