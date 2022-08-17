import React, { useState } from "react";
import Button from "../../design/Button/Button";
import TextBox from "../../design/TextBox/TextBox";
import "./ResetPasswordForm.css";

export default function ResetPasswordForm(props) {
  const [resetPasswordFields, setResetPasswordFields] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      resetPasswordFields.password !== resetPasswordFields.passwordConfirmation
    ) {
      alert("Passwords don't match");
    } else {
      props.onSubmit(resetPasswordFields);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="forgot-password-form">
      <TextBox
        type="email"
        name="email"
        labelText="Email"
        placeholder="Email"
        value={resetPasswordFields.email}
        onChange={(event) =>
          setResetPasswordFields({
            ...resetPasswordFields,
            email: event.target.value,
          })
        }
        required
      />
      <TextBox
        type="password"
        name="password"
        labelText="New Password"
        placeholder="New Password"
        value={resetPasswordFields.password}
        onChange={(event) =>
          setResetPasswordFields({
            ...resetPasswordFields,
            password: event.target.value,
          })
        }
        required
      />
      <TextBox
        type="password"
        name="passwordConfirmation"
        labelText="Password Confirmation"
        placeholder="Password Confirmation"
        value={resetPasswordFields.passwordConfirmation}
        onChange={(event) =>
          setResetPasswordFields({
            ...resetPasswordFields,
            passwordConfirmation: event.target.value,
          })
        }
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
