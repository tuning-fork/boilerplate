import React from "react";
import { withRouter, useHistory, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./Sidebar.css";

export default function Sidebar(props) {
  return (
    <div className={clsx(props.className, "sidebar")}>{props.children}</div>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string,
};

Sidebar.defaultProps = {};

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
