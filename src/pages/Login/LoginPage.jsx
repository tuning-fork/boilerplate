import React, { useCallback } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import Footer from "../../Components/design/Footer/Footer";
import NavbarSplashpage from "../../Components/design/Navbar/NavbarSplashpage/NavbarSplashpage";
import { useCurrentUser } from "../../Contexts/currentUserContext";
import LoginForm from "./LoginForm/LoginForm";
import "./LoginPage.css";

export default function LoginPage() {
  const history = useHistory();
  const location = useLocation();
  const { login } = useCurrentUser();

  const handleSubmit = useCallback(
    async ({ email, password }) => {
      await login(email, password);
      history.push(location.state?.from ?? "/organizations");
    },
    [history, location, login]
  );

  return (
    <div className="login-page">
      <NavbarSplashpage />
      <main className="login-page__content">
        <section>
          <h1 className="login-page__header">Login</h1>
          <p className="login-page__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu
            odio ut sem nulla pharetra diam sit amet.
          </p>
        </section>
        <LoginForm onSubmit={handleSubmit} />
        <p className="login-page__sign-up">
          <Link to="/forgot_password">Forgot Password?</Link>
        </p>
        <p className="login-page__sign-up">
          New to Boilerplate? <Link to="/signup">Create an Account</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
