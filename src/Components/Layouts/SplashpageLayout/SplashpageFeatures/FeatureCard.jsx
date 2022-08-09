import React from "react";
import "./FeatureCard.css";
import Sample_screenshot from "Sample_screenshot.png";

export default function FeatureCard(props) {
  return (
    <>
      <div className={"feature-card__container"}>
        <div>
          <h1 className="feature-card__name">{props.currentFeature.name}</h1>
        </div>
        <div className={"feature-card__content"}>
          <div className={"feature-card__text-frame"}>
            <div className={"feature-card__text"}>{FEATURE_TEXT}</div>
          </div>
          <div className={"feature-card__screenshot-frame"}>
            <img
              src={Sample_screenshot}
              alt="Feature Screenshot Image"
              className="feature-card__screenshot-image"
            />
          </div>
        </div>
      </div>
    </>
  );
}
