import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./Accordion.css";

export default function Accordion(props) {
  return <div className="accordion">{props.children}</div>;
}

Accordion.propTypes = {
  className: PropTypes.string,
};

Accordion.defaultProps = {};
