import React from "react";
import PropTypes from "prop-types";
import "./Modal.css";

export default function Modal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal">
      <div className=" modal__content">{props.children}</div>
    </div>
  );
}

Modal.propTypes = {
  show: PropTypes.bool,
};

Modal.defaultProps = {
  show: false,
};
