import React from "react";
import clsx from "clsx";
import "./Spinner.css";

const SpinnerSize = {
  Small: "sm",
  Medium: "md",
  Large: "lg",
};

export default function Spinner(props) {
  return (
    <div
      className={clsx(
        "spinner",
        `spinner--${props.size}`,
        props.centered && "spinner--centered"
      )}
    >
      <svg className="spinner__svg" viewBox="0 0 50 50" aria-hidden="true">
        <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
      </svg>
    </div>
  );
}

Spinner.defaultProps = {
  size: SpinnerSize.Small,
};
