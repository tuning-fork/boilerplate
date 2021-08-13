import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./TextBox.css";

export default function TextBox(props) {
  const { labelText, onChange, className, prefix, suffix, align, type } = props;

  return (
    <label className={clsx(className, "text-box", `text-box--align-${align}`)}>
      <span className="text-box__label">{labelText}</span>
      <span className="text-box__container">
        {prefix && <span className="text-box__prefix">{prefix}</span>}
        <input className="text-box__input" type={type} onChange={onChange} />
        {suffix && <span className="text-box__suffix">{suffix}</span>}
      </span>
    </label>
  );
}

TextBox.propTypes = {
  align: PropTypes.oneOf(["left", "right"]),
  className: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.string,
};

TextBox.defaultProps = {
  align: "left",
  type: "text",
};
