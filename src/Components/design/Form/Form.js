//  Forms contain:
//      Header text
//      Label texts for inputs
//      Inputs:
//          Text inputs
//          Quilltext html inputs
//          Dropdowns
//          Checkboxes
//      Buttons:
//          Cancel button - outline
//          Save button - primary

import React from "react";
import PropTypes from "prop-types";
import "./Form.css";

export default function Form() {
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
