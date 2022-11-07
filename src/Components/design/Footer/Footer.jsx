import React from "react";
import "./Footer.css";

const textForCopyright = `Copyright Jess White and Michael McFaddin 2020 - ${new Date().getFullYear()}`;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">{textForCopyright}</div>
    </footer>
  );
}
