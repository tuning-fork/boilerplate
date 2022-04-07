import React from "react";
import { useHistory } from "react-router-dom";
import Container from "../../design/Container/Container";
import ResetPasswordForm from "./ResetPasswordForm";
import "./ResetPassword.css";
import axios from "axios";

export default function ResetPassword() {
  const history = useHistory();
  const handleSubmit = (resetPasswordFields) => {
    resetPassword(resetPasswordFields);
    history.push("/splashpage");
  };

  const resetPassword = (credentials) => {
    axios
      .post("api/reset_password", credentials)
      .then((response) => {
        if (response) {
          alert(response.data.message);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="reset-password">
        <Container as="section" centered>
          <ResetPasswordForm onSubmit={handleSubmit} />
        </Container>
      </div>
    </>
  );
}
