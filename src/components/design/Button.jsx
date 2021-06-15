import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

export const ButtonVariant = {
  Contained: "contained",
  Outlined: "outlined",
  Text: "text",
};
export const ButtonColor = {
  Primary: "primary",
  Success: "success",
  Error: "error",
  Contrast: "contrast",
};

export default function Button(props) {
  return (
    <button
      {...props}
      className={`${props.className} button button--${props.variant} button--${props.color}`}
    >
      {Array.isArray(props.children)
        ? props.children.map((child) => {
            // Wrap text nodes in span for styling with icons.
            if (typeof child === "string") {
              return <span>{child}</span>;
            }
            return child;
          })
        : props.children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(Object.values(ButtonColor)),
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  type: PropTypes.oneOf(["button", "reset", "submit"]),
  variant: PropTypes.oneOf(Object.values(ButtonVariant)),
};

Button.defaultProps = {
  className: "",
  color: ButtonColor.Primary,
  onClick: () => {},
  tabIndex: 0,
  type: "button",
  variant: ButtonVariant.Contained,
};
