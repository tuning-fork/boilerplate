import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./Label.css";

export default function Label(props) {
  const { children, className } = props;
  return (
    <label className={clsx(className, "label")} htmlFor={props.htmlFor}>
      {children}
    </label>
  );
}

Label.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  htmlFor: PropTypes.string.isRequired,
};

Label.defaultProps = {};
