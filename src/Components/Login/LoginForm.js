import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "components/design/Button/Button";
import TextBox from "components/design/TextBox/TextBox";
import { useCurrentUser } from "contexts/currentUserContext";
import "./LoginForm.css";

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
      <form className="login-form" onSubmit={handleSubmit}>
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
            onClick={() => props.toggleModalContents("Forgot Password")}
          >
            Forgot Password?
          </Button>
        </div>
      </form>
    </>
  );
}
