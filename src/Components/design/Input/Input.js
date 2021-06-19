//      Inputs:
//          Text inputs
//          Quilltext html inputs
//          Dropdowns
//          Checkboxes

import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./Input.css";

export const InputType = {
  Text: "text",
  Checkbox: "checkbox",
  // QuillText: "quilltext",
  // Dropdown: "dropdown",
};

export default function Input(props) {
  return (
    <label>
      {props.labelText}
      <input {...props} className={clsx(props.className, "input")} />
    </label>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(InputType)),
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: "text",
};
