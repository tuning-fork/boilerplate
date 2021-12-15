import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "../../Button/Button";
import "./NavbarLogin.css";
import TextBox from "../../TextBox/TextBox";
import customSignInButton from "./custom_signin_button.png";

export default function NavbarLogin() {
  const [loginInputs, setLoginInputs] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("banana");
    // login(email, password);

    // createGrant(organizationClient, {
    //   ...newGrant,
    //   organization_id: currentOrganizationStore.currentOrganization.id,
    // })
    //   .then((grant) => {
    //     history.push(
    //       `/organizations/${currentOrganizationId}/grants/${grant.id}`
    //     );
    //   })
    //   .catch((error) => {
    //     console.log("grant creation error", error);
    //   });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="navbar-login__form">
        <TextBox
          className="navbar-login__inputs navbar-login__items"
          placeholderText="Username"
          onChange={(event) =>
            setLoginInputs({ ...loginInputs, username: event.target.value })
          }
          required
        />
        <TextBox
          className="navbar-login__inputs navbar-login__items"
          placeholderText="Password"
          onChange={(event) =>
            setLoginInputs({ ...loginInputs, password: event.target.value })
          }
          required
        />
        <div className="navbar-login__actions navbar-login__items">
          <Button variant="none" type="submit">
            <img
              src={customSignInButton}
              alt="Custom button"
              className="navbar-login__image"
            />
          </Button>
        </div>
      </form>
    </div>
  );
}
