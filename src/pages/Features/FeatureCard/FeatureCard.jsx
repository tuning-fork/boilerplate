import React from "react";
import organizations_screenshot from "./organizations_screenshot.png";
import "./FeatureCard.css";

export default function FeatureCard({ feature }) {
  let imageToUse;
  if (feature.image === "Organizations Screenshot") {
    imageToUse = organizations_screenshot;
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
