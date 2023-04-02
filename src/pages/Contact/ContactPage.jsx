import React from "react";
import Footer from "../../Components/design/Footer/Footer";
import NavbarSplashpage from "../../Components/design/Navbar/NavbarSplashpage/NavbarSplashpage";
import SplashpageContactForm from "../../Components/Layouts/SplashpageLayout/SplashpageContact/SplashpageContactForm";
import "./ContactPage.css";

export default function ContactPage() {
  return (
    <div className="contact-page">
      <NavbarSplashpage />
      <main className="contact-page__content">
        <section>
          <h1 className="contact-page__header">Contact Us</h1>
          <p className="contact-page__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu
            odio ut sem nulla pharetra diam sit amet.
          </p>
        </section>
        <SplashpageContactForm />
      </main>
      <Footer />
    </div>
  );
}
