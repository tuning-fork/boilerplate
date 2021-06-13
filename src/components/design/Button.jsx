import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const ButtonVariant = {
  Contained: "contained",
  Outlined: "outlined",
  Text: "text",
};
const ButtonColor = {
  Primary: "primary",
  Success: "success",
  Error: "error",
  Contrast: "contrast",
};

export default function Button(props) {
  return (
    <button
      className={`button button--${props.variant} button--${props.color}`}
      type="button"
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(Object.values(ButtonVariant)),
  color: PropTypes.oneOf(Object.values(ButtonColor)),
};

Button.defaultProps = {
  variant: ButtonVariant.Contained,
  color: ButtonColor.Primary,
};
