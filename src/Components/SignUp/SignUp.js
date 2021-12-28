import React from "react";
import { useHistory } from "react-router-dom";
import Container from "../design/Container/Container";
// import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import { createUser } from "../../Services/Auth/SignupService";
// import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import SignUpForm from "./SignUpForm";
import "./SignUp.css";

export default function SignUp(props) {
  // const buildOrganizationsLink = useBuildOrganizationsLink();
  const history = useHistory();

  const handleCancel = (event) => {
    event.preventDefault();
    props.onCancel();
    history.push(`/landing_page`);
  };

  const handleSubmit = (newUserFields) => {
    createUser(newUserFields)
      .then((createdUser) => {
        alert("user created!");
        console.log(createdUser);
        props.onSubmit();
        history.push(`/landing_page`);
      })
      .catch((error) => {
        console.error(error);
        alert(
          "Eek! Something went wrong when creating the user. Try again soon."
        );
      });
  };

  return (
    <div className="signup">
      <Container as="section" centered>
        <h1 className="signup">Sign Up</h1>
        <SignUpForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </Container>
    </div>
  );
}
