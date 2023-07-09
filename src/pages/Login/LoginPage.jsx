import React, { useCallback } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { Container } from '@mantine/core'
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
        <Container component="section" size="sm">
          <h1 className="login-page__header">Login</h1>
          <LoginForm onSubmit={handleSubmit} />
          <p className="login-page__sign-up">
            <Link to="/forgot_password">Forgot Password?</Link>
          </p>
          <p className="login-page__sign-up">
            New to Boilerplate? <Link to="/signup">Create an Account</Link>
          </p>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
