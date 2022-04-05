import React, { useState } from "react";
import Button from "../../design/Button/Button";
import TextBox from "../../design/TextBox/TextBox";
import "./ForgotPasswordForm.css";

export default function ForgotPasswordForm(props) {
  const [forgotPasswordFields, setForgotPasswordFields] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    setForgotPasswordFields({ ...forgotPasswordFields });
    props.onSubmit(forgotPasswordFields);
  };

  return (
    <>
      {!props.displayResetMessage ? (
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <TextBox
            type="email"
            name="email"
            labelText="Email"
            placeholder="Your email here"
            value={forgotPasswordFields.email}
            onChange={(event) =>
              setForgotPasswordFields({
                ...forgotPasswordFields,
                email: event.target.value,
              })
            }
            required
          />
          <div className="forgot-password-form__actions">
            <Button
              // variant="forgot-password"
              type="submit"
              className="forgot-password-form__forgot-password-submit-button"
            >
              Submit
            </Button>
          </div>
        </form>
      ) : (
        <h2>
          If this email exists, we have sent a link to reset your password.
        </h2>
      )}
    </>
  );
}
