import React from "react";
import Footer from "../../Components/design/Footer/Footer";
import NavbarSplashpage from "../../Components/design/Navbar/NavbarSplashpage/NavbarSplashpage";
import "./ContactPage.css";

export default function ContactPage() {
  return (
    <div className="team-page">
      <NavbarSplashpage />
      <main className="team-page__content">
        <section className="team-page__text">
          <h1 className="team-page__header">Our Team</h1>
          <p>Contact PAGE</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
