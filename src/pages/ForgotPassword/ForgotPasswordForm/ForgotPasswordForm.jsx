import React, { useState } from "react";
import { Button } from "@mantine/core";
import TextBox from "../../../Components/design/TextBox/TextBox";
import "./ForgotPasswordForm.css";

export default function ForgotPasswordForm(props) {
  const [email, setEmail] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit} className="forgot-password-form">
      <TextBox
        type="email"
        name="email"
        labelText="Email"
        placeholder="Your email here"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <div className="forgot-password-form__actions">
        <Button
          type="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
