import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "../../Button/Button";
import "./NavbarLogin.css";
import TextBox from "../../TextBox/TextBox";

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
        {/* <div className="navbar-login__inputs"> */}
        <TextBox
          placeholderText="Username"
          onChange={(event) =>
            setLoginInputs({ ...loginInputs, username: event.target.value })
          }
          required
        />
        <TextBox
          placeholderText="Password"
          onChange={(event) =>
            setLoginInputs({ ...loginInputs, password: event.target.value })
          }
          required
        />
        {/* </div> */}
        <div className="navbar-login__actions">
          <Button type="submit">Log In</Button>
        </div>
      </form>
    </div>
  );
}
