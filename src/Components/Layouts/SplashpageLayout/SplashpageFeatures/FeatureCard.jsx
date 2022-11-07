import React from "react";
import "./FeatureCard.css";
import organizations_screenshot from "./organizations_screenshot.png";

export default function FeatureCard({ feature }) {
  let imageToUse;
  if (feature.image === "Organizations Screenshot") {
    imageToUse = organizations_screenshot;
  }

  return (
    <>
      <div className={"feature-card__container"}>
        <div>
          <h2 className="feature-card__name">{feature.name}</h2>
          <div>
            <img
              src={imageToUse}
              alt={feature.image}
              className="feature-card__screenshot-image"
            />
          </div>
        </div>
        <div className={"feature-card__text-frame"}>
          <div className={"feature-card__text"}>{feature.text}</div>
        </div>
      </div>
    </>
  );
}
