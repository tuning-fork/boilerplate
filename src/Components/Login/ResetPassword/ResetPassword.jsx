import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Container from "../../design/Container/Container";
import ResetPasswordForm from "./ResetPasswordForm";
import "./ResetPassword.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";
import useQuery from "../../../Hooks/useQuery";

export default function ResetPassword() {
  const history = useHistory();
  const query = useQuery();
  const token = useMemo(() => query.get("token"), [query]);
  const email = useMemo(() => query.get("email"), [query]);

  const handleSubmit = (resetPasswordFields) => {
    resetPassword(resetPasswordFields);
    history.push("/splashpage");
  };

  const resetPassword = (credentials) => {
    axios
      .post("api/reset_password", { ...credentials, token, email })
      .then((response) => {
        if (response) {
          alert(response.data.message);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container as="section" centered className="reset-password">
      {token && email ? (
        <>
          <Link className="reset-password__back-button" to="/splashpage">
            <MdChevronLeft />
            Back to Splashpage
          </Link>
          <h1 className="reset-password__header">Reset Password</h1>
          <p>Enter the new password for {email}.</p>
          <ResetPasswordForm onSubmit={handleSubmit} />
        </>
      ) : (
        <>
          <h1 className="reset-password__header">Something went wrong</h1>
          <p>
            Please try resetting your password again{" "}
            <Link to="/splashpage">from the splashpage.</Link>
          </p>
        </>
      )}
    </Container>
  );
}
