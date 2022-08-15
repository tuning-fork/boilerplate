import React, { useState } from "react";
import Container from "../../design/Container/Container";
import ForgotPasswordForm from "./ForgotPasswordForm";
import "./ForgotPassword.css";
import axios from "axios";

export default function ForgotPassword(props) {
  const [displayResetMessage, setDisplayResetMessage] = useState("");

  const forgotPassword = (email) => {
    axios
      .post("/api/forgot_password", { email: email })
      .then((response) => {
        setDisplayResetMessage(response.data.message);
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (email) => {
    forgotPassword(email);
  };

  return (
    <>
      <div className="forgot-password">
        <Container as="section" centered>
          <ForgotPasswordForm
            onSubmit={handleSubmit}
            toggleModalContents={props.toggleModalContents}
            displayResetMessage={displayResetMessage}
          />
        </Container>
      </div>
    </>
  );
}
