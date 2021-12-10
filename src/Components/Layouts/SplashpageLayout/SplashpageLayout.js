import React from "react";
import NavbarSplashpage from "../../design/Navbar/NavbarSplashpage/NavbarSplashpage";
import "./SplashpageLayout.css";

export default function SplashpageLayout(props) {
  return (
    <main className="layout">
      <NavbarSplashpage />
      <div className="layout__content">{props.children}</div>
    </main>
  );
}
