import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import "./LoginForm.css";
import { useCurrentUser } from "../../Contexts/currentUserContext";

export default function LoginForm(props) {
  const [loginFields, setLoginFields] = useState({});
  const location = useLocation();
  const { error } = useCurrentUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginFields({ ...loginFields });
    props.onSubmit(loginFields);
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
          <Button type="submit">Login</Button>
          <Button variant="text" to="/forgot_password" as={Link}>
            Forgot Password?
          </Button>
        </div>
      </form>
    </>
  );
}
