import React, { useMemo } from "react";
import { useMutation } from "react-query";
import { useHistory, Link } from "react-router-dom";
import { MdChevronLeft } from "react-icons/md";
import Container from "../../design/Container/Container";
import useQuery from "../../../Hooks/useQuery";
import ResetPasswordForm from "./ResetPasswordForm";
import * as PasswordService from "../../../Services/Auth/PasswordService";
import "./ResetPassword.css";

export default function ResetPassword() {
  const history = useHistory();
  const query = useQuery();
  const token = useMemo(() => query.get("token"), [query]);
  const email = useMemo(() => query.get("email"), [query]);

  const handleSubmit = (resetPasswordFields) => {
    resetPassword(resetPasswordFields);
  };

  const { mutate: resetPassword } = useMutation(
    (credentials) =>
      PasswordService.resetPassword({
        ...credentials,
        token,
        email,
      }),
    {
      onSuccess: (response) => {
        alert(response.data.message);
      },
      onError(error) {
        console.error(error);
        alert(
          "Invalid login information given. Please try resetting your password again."
        );
      },
      onSettled() {
        history.push("/splashpage");
      },
    }
  );

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
