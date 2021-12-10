import React from "react";
import PropTypes from "prop-types";
import "./Form.css";

export default function Form(props) {
  return (
    <div className="form">
      <div className="form__content"></div>
    </div>
  );
}

Form.propTypes = {
  show: PropTypes.bool,
};

Form.defaultProps = {
  show: false,
};
