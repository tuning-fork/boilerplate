import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./Accordion.css";

export default function NavBar(props) {
  return (
    <div className={clsx(props.className, "navbar")}>{props.children}</div>
  );
}

NavBar.propTypes = {
  className: PropTypes.string,
};

NavBar.defaultProps = {};
