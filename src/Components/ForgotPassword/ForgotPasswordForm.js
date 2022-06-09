import React, { useState } from "react";
import Button from "components/design/Button/Button";
import TextBox from "components/design/TextBox/TextBox";
import "./ForgotPasswordForm.css";

export default function ForgotPasswordForm(props) {
  const [forgotPasswordFields, setForgotPasswordFields] = useState("");
  const handleSubmitForgotPassword = (event) => {
    event.preventDefault();
    props.onSubmit(forgotPasswordFields);
  };

  return (
    <>
      {!props.displayResetMessage ? (
        <div>
          <p className="forgot-password-form__header-text">
            Please enter your email below. We'll send a recovery link.
          </p>
          <form
            onSubmit={handleSubmitForgotPassword}
            className="forgot-password-form"
          >
            <TextBox
              type="email"
              name="email"
              labelText="Email"
              placeholder="Your email here"
              value={forgotPasswordFields.email}
              onChange={(event) => setForgotPasswordFields(event.target.value)}
              required
            />
            <div className="forgot-password-form__actions">
              <Button
                variant="none"
                type="submit"
                className="forgot-password-form__forgot-password-submit-button"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <p className="forgot-password-form__header-text">
          {props.displayResetMessage}
        </p>
      )}
    </>
  );
}
