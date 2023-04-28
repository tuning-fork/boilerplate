import React, { useState } from "react";
import Footer from "../../Components/design/Footer/Footer";
import NavbarSplashpage from "../../Components/design/Navbar/NavbarSplashpage/NavbarSplashpage";
import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";
import { forgotPassword } from "../../Services/Auth/PasswordService";
import "./ForgotPasswordPage.css";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState(null);

  const handleSubmit = (email) => {
    forgotPassword(email)
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error(error));
  };

  return (
    <div className="forgot-password-page">
      <NavbarSplashpage />
      <main className="forgot-password-page__content">
        <section>
          <h1 className="forgot-password-page__header">Forgot Password</h1>
          {message ? (
            <p className="forgot-password-form__header-text">{message}</p>
          ) : (
            <>
              <p className="forgot-password-page__text">
                Please enter your email below. We'll send a recovery link.
              </p>
              <ForgotPasswordForm onSubmit={handleSubmit} />
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
