import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Footer from "../../Components/design/Footer/Footer";
import NavbarSplashpage from "../../Components/design/Navbar/NavbarSplashpage/NavbarSplashpage";
import SignUpForm from "./SignUpForm/SignUpForm";
import { createUser } from "../../Services/Auth/SignupService";
import "./SignUpPage.css";
import { useCurrentUser } from "../../Contexts/currentUserContext";

export default function SignUpPage() {
  const history = useHistory();
  const { login } = useCurrentUser();

  // TODO: maybe use react-query here
  const handleSubmit = (newUserFields) => {
    createUser(newUserFields)
      .then(() => login(newUserFields.email, newUserFields.password))
      .then(() => history.push(`/organizations`))
      .catch((error) => {
        alert(
          error.response.data.errors[0] ||
            "Something went wrong while creating this user. Please try again later."
        );
      });
  };

  return (
    <div className="sign-up-page">
      <NavbarSplashpage />
      <main className="sign-up-page__content">
        <section>
          <h1 className="sign-up-page__header">Sign Up</h1>
          <p className="sign-up-page__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu
            odio ut sem nulla pharetra diam sit amet.
          </p>
        </section>
        <SignUpForm onSubmit={handleSubmit} />
        <p className="sign-up__login">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
