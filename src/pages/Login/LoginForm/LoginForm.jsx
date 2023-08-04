import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@mantine/core";
import TextBox from "../../../Components/design/TextBox/TextBox";
import { useCurrentUser } from "../../../Contexts/currentUserContext";
import "./LoginForm.css";

export default function LoginForm(props) {
  const [loginFields, setLoginFields] = useState({});
  const location = useLocation();
  const { error } = useCurrentUser();

  const handleSubmit = (event) => {
    event.preventDefault();
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
          <Button type="submit" size="md">
            Log In
          </Button>
        </div>
      </form>
    </>
  );
}
