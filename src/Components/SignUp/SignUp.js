import React from "react";
import { useHistory } from "react-router-dom";
import Container from "../design/Container/Container";
import { createUser } from "../../Services/Auth/SignupService";
import SignUpForm from "./SignUpForm";
import "./SignUp.css";

export default function SignUp(props) {
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
        props.toggleModalContents("Log In");
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
        <SignUpForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          toggleModalContents={props.toggleModalContents}
        />
      </Container>
    </div>
  );
}
