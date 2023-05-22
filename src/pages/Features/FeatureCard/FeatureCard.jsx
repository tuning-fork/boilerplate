import React from "react";
import dashboard_screenshot from "./dashboard_screenshot.png";
import grant_screenshot from "./grant_screenshot.png";
import boilerplates_screenshot from "./boilerplates_screenshot.png";
import "./FeatureCard.css";

export default function FeatureCard({ feature }) {
  let imageToUse;
  if (feature.image === "Organizations Screenshot") {
    imageToUse = dashboard_screenshot;
  }
  if (feature.image === "Boilerplates Screenshot") {
    imageToUse = boilerplates_screenshot;
  }
  if (feature.image === "Grant Screenshot") {
    imageToUse = grant_screenshot;
  }

  return (
    <article className="feature-card__container">
      <h2 className="feature-card__name">{feature.name}</h2>
      <img
        src={imageToUse}
        alt={feature.image}
        className="feature-card__screenshot-image"
      />
      <p className="feature-card__text">{feature.text}</p>
    </article>
  );
}
