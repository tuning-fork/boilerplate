import React, { useState } from "react";
import NavbarSplashpage from "../../design/Navbar/NavbarSplashpage/NavbarSplashpage";
import "./SplashpageLayout.css";
import allSplashpageGraphicElements from "./allSplashpageGraphicElements.png";
import getStartedButton from "./getStartedButton.png";
import NavbarLogin from "../../design/Navbar/NavbarLogin/NavbarLogin";
import Button from "../../design/Button/Button";

export default function SplashpageLayout(props) {
  const [showNavbarLogin, setShowNavbarLogin] = useState(false);

  return (
    <main className="splashpage-layout">
      <NavbarSplashpage />
      <div className="splashpage-layout__content">{props.children}</div>
      <img
        src={allSplashpageGraphicElements}
        alt="Splashpage graphics"
        className="splashpage-layout__graphic-elements"
      />
      <div className="splashpage-layout__bottom-buttons">
        <Button variant="none">
          <img src={getStartedButton} alt="Get started graphic button" />
        </Button>
        <Button variant="none">or Sign In</Button>
      </div>
      {showNavbarLogin ? <NavbarLogin /> : null}
    </main>
  );
}
