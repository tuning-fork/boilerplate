//      Inputs:
//          Text inputs
//          Quilltext html inputs
//          Dropdowns
//          Checkboxes

import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./Input.css";

export const InputVariant = {
  Text: "text",
  QuillText: "quilltext",
  Checkbox: "checkbox",
  Dropdown: "dropdown",
};

export default function Input(props) {
  return (
    <button
      {...props}
      className={clsx(
        props.className,
        "input",
        `input--${props.variant}`,
        props.disabled && "input--disabled"
      )}
    >
      {Array.isArray(props.children)
        ? props.children.map((child, index) => {
            //We might be able to use this for placeholder icons?
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

Input.propTypes = {
  className: PropTypes.string,
  //It seems like we want disabled inputs, maybe?
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "reset", "submit"]),
  variant: PropTypes.oneOf(Object.values(ButtonVariant)),
};

Button.defaultProps = {
  className: "",
  color: ButtonColor.Primary,
  disabled: false,
  onClick: () => {},
  tabIndex: 0,
  type: "input",
  variant: InputVariant.Text,
};
