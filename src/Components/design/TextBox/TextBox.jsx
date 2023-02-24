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
    inputType,
    search,
    value,
    maxLength,
    ...rest
  } = props;

  return (
    <label className={clsx(className, "text-box", `text-box--align-${align}`)}>
      <span className="text-box__label">{labelText}</span>
      <span className="text-box__container">
        {prefix && <span className="text-box__prefix">{prefix}</span>}
        {search ? <MdSearch className="text-box__search_icon" /> : null}
        {inputType === "text" ? (
          <input
            className="text-box__input"
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholderText}
            required={required}
            {...rest}
            data-testid={labelText}
          />
        ) : (
          <textarea
            rows="12"
            cols="80"
            className="text-box__input"
            value={value}
            onChange={onChange}
            placeholder={placeholderText}
            required={required}
            maxlength={maxLength}
            {...rest}
          />
        )}
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
  inputType: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.string,
  search: PropTypes.bool,
};

TextBox.defaultProps = {
  align: "left",
  required: false,
  type: "text",
  inputType: "text",
};
