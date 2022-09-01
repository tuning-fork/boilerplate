import React from "react";
import PropTypes from "prop-types";
import "./Footer.css";

export default function Footer(props) {
  return (
    <div className="footer">
      <div className="footer-content">{props.footerText}</div>
    </div>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
  footerText: PropTypes.string,
};
