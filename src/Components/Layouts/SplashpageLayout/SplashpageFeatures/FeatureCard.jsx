import React from "react";
import "./FeatureCard.css";
import Sample_screenshot from "./Sample_screenshot.png";

export default function FeatureCard({ feature }) {
  return (
    <>
      <div className={"feature-card__container"}>
        <div>
          <h2 className="feature-card__name">{feature.name}</h2>
          <div>
            <img
              src={Sample_screenshot}
              alt="Feature Screenshot Image"
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
