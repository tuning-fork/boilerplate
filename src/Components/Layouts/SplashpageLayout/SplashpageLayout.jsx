import React from "react";
import NavbarSplashpage from "../../design/Navbar/NavbarSplashpage/NavbarSplashpage";
import splashpageBackgroundImage from "./splashpage_background_image7.png";
import Footer from "../../design/Footer/Footer";
import "./SplashpageLayout.css";

export default function SplashpageLayout() {
  return (
    <div>
      <div className="splashpage-layout__navbar-container">
        <NavbarSplashpage />
      </div>
      <main className="splashpage-layout">
        <div className="splashpage-layout__content">
          <img
            src={splashpageBackgroundImage}
            alt="Splashpage graphics"
            className="splashpage-layout__background-image"
          />
        </div>
        <Footer />
      </main>
    </div>
  );
}
