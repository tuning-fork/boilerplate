import React from "react";
import "./FeaturePage.css";
import { FEATURE_CONTENT } from "./FeaturesContent";
import Sample_screenshot from "./Sample_screenshot.png";

export default function FeaturePage(props) {
  return (
    <div className="feature-page__content">
      <div className="feature-page__header">Features</div>
      <div className="feature-page__intro-text">Hello world!</div>
      {FEATURE_CONTENT.map((feature) => {
        return (
          <>
            <div className="feature-page__text">
              <div>{feature.feature_name}</div>
              <div>{feature.feature_text}</div>
            </div>
            <img
              src={Sample_screenshot}
              alt="Sample Screenshot"
              className="feature-page__screenshot-image"
            />
          </>
        );
      })}
    </div>
  );
}

//basic format:
// two outline cards
// text
// screenshot
// same layout as team page

// Intro to Boilerplate (basic summary)
// List of major features to blurb:
// Organizations
// Organization hub
// user profiles
// User dashboard
// Boilerplates
// create boilerplate
// boilerplate library
// Grants
// create grant
// store grants
// Categories
// Funding Orgs
// coming soon section
