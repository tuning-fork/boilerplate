import React, { useState } from "react";
import BioFrame from "../BioFrame/BioFrame.js";
import "./TeamPage.css";

export default function TeamPage() {
  return (
    <div>
      <h1 className="team-page__header">Our Team</h1>
      <div className="team-page__content">
        <BioFrame />
      </div>
    </div>
  );
}
//gallery of mini bio cards with headshot, name, and title
//...click on one
//go to individual display
