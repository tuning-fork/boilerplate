import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./Input.css";

export const InputType = {
  Text: "text",
  Checkbox: "checkbox",
};

export default function Input(props) {
  const { labelText, className, ...restProps } = props;

  return (
    <label>
      <span className="input-label">{labelText}</span>
      <input {...restProps} className={clsx(className, "input")} />
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
