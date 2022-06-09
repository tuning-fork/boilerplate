import React from "react";
import { useHistory } from "react-router-dom";
import Container from "components/design/Container/Container";
import { createUser } from "services/p0/Auth/SignupService";
import SignUpForm from "./SignUpForm";
import "./SignUp.css";

export default function SignUp(props) {
  const history = useHistory();

  const handleCancel = (event) => {
    event.preventDefault();
    props.onCancel();
    history.push(`/SplashPage`);
  };

  const handleSubmit = (newUserFields) => {
    createUser(newUserFields)
      .then((createdUser) => {
        alert("user created!");
        console.log(createdUser);
        props.toggleModalContents("Log In");
      })
      .catch((error) => {
        alert(
          error.response.data.errors[0] ||
            "Something went wrong while creating this user. Please try again later."
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
