import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const variants = {
  primary: "primary",
  outlined: "outlined",
  text: "text",
};
const colors = {
  primary: "#009285",
  success: "#15C15D",
  error: "#FF4238",
  contrast: "#192434",
};

export default function Button(props) {
  return (
    <button
      className={`Button Button--${props.variant} Button--${props.color}`}
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
  variant: "primary",
  color: "primary",
};
