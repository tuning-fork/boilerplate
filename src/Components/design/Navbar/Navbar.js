import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./Navbar.css";

export default function Navbar(props) {
  return (
    <div className={clsx(props.className, "navbar")}>{props.children}</div>
  );
}

Navbar.propTypes = {
  className: PropTypes.string,
};

Navbar.defaultProps = {};

const Container = ({ children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-evenly",
      marginBottom: "20px",
    }}
  >
    {children}
  </div>
);
