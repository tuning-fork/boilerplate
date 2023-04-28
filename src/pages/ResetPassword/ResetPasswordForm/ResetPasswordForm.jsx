import React, { useState } from "react";
import Button from "../../../Components/design/Button/Button";
import TextBox from "../../../Components/design/TextBox/TextBox";
import "./ResetPasswordForm.css";

export default function ResetPasswordForm(props) {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== newPasswordConfirmation) {
      alert("Passwords don't match");
    } else {
      props.onSubmit({ password: newPassword });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="forgot-password-form">
      <TextBox
        type="password"
        name="password"
        labelText="New Password"
        placeholder="New Password"
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
        required
      />
      <TextBox
        type="password"
        name="passwordConfirmation"
        labelText="Password Confirmation"
        placeholder="Password Confirmation"
        value={newPasswordConfirmation}
        onChange={(event) => setNewPasswordConfirmation(event.target.value)}
        required
      />
      <div className="reset-password-form__actions">
        <Button
          variant="none"
          type="submit"
          className="reset-password-form__reset-password-submit-button"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
