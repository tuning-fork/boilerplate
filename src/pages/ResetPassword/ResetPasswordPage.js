import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";
import axios from "axios";
import Container from "../../components/design/Container/Container";
import ResetPasswordForm from "./ResetPasswordForm";
import "./ResetPasswordPage.css";

export default function ResetPasswordPage() {
  const history = useHistory();
  const handleSubmit = (resetPasswordFields) => {
    resetPassword(resetPasswordFields);
    history.push("/SplashPage");
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
          <Link className="reset-password__back-button" to="/SplashPage">
            <MdChevronLeft />
            Back to SplashPage
          </Link>
          <h1 className="reset-password__header">Reset Password</h1>
          <ResetPasswordForm onSubmit={handleSubmit} />
        </Container>
      </div>
    </>
  );
}
