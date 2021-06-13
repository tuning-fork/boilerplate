import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const variants = {
  contained: "contained",
  outlined: "outlined",
  text: "text",
};
const colors = {
  primary: "primary",
  success: "success",
  error: "error",
  contrast: "contrast",
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
  variant: PropTypes.oneOf(Object.keys(variants)),
  color: PropTypes.oneOf(Object.keys(colors)),
};

Button.defaultProps = {
  variant: variants.contained,
  color: colors.primary,
};
