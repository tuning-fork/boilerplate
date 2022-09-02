import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./TextBox.css";
import { MdSearch } from "react-icons/md";

export default function TextBox(props) {
  const {
    labelText,
    placeholderText,
    onChange,
    className,
    prefix,
    suffix,
    align,
    required,
    type,
    search,
    value,
    ...rest
  } = props;

  return (
    <label className={clsx(className, "text-box", `text-box--align-${align}`)}>
      <span className="text-box__label">{labelText}</span>
      <span className="text-box__container">
        {prefix && <span className="text-box__prefix">{prefix}</span>}
        {search ? <MdSearch className="text-box__search_icon" /> : null}
        <input
          className="text-box__input"
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholderText}
          required={required}
          {...rest}
        />
        {suffix && <span className="text-box__suffix">{suffix}</span>}
      </span>
    </label>
  );
}

TextBox.propTypes = {
  align: PropTypes.oneOf(["left", "right"]),
  className: PropTypes.string,
  labelText: PropTypes.string,
  placeholderText: PropTypes.string,
  onChange: PropTypes.func,
  prefix: PropTypes.node,
  required: PropTypes.bool,
  suffix: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.string,
  search: PropTypes.bool,
};

TextBox.defaultProps = {
  align: "left",
  required: false,
  type: "text",
};
