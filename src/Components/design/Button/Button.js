import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./Button.css";

export const ButtonVariant = {
  Contained: "contained",
  Outlined: "outlined",
  Text: "text",
  None: "none",
  UserIcon: "usericon",
};
export const ButtonColor = {
  Primary: "primary",
  Success: "success",
  Error: "error",
  Contrast: "contrast",
  ColorWheel: "colorwheel",
};

export default function Button(props) {
  return (
    <button
      {...props}
      className={clsx(
        props.className,
        "button",
        `button--${props.variant}`,
        `button--${props.color}`,
        props.disabled && "button--disabled"
      )}
    >
      {Array.isArray(props.children)
        ? props.children.map((child, index) => {
            // Wrap text nodes in span for styling with icons.
            if (typeof child === "string") {
              return <span key={index}>{child}</span>;
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
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  type: PropTypes.oneOf(["button", "reset", "submit"]),
  variant: PropTypes.oneOf(Object.values(ButtonVariant)),
};

Button.defaultProps = {
  className: "",
  color: ButtonColor.Primary,
  disabled: false,
  onClick: () => {},
  tabIndex: 0,
  type: "button",
  variant: ButtonVariant.Contained,
};
