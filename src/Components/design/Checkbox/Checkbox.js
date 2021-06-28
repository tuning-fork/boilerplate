import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import CheckIcon from "@material-ui/icons/Check";
import "./Checkbox.css";

export default function Checkbox(props) {
  const { labelText, className, checked, onChange } = props;

  return (
    <label className={clsx(className, "checkbox")}>
      <input
        className="checkbox__input"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <CheckIcon className="checkbox__check" />
      <div className="checkbox__background"></div>
      <span className="checkbox__label">{labelText}</span>
    </label>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  checked: false,
  indeterminate: false,
};
