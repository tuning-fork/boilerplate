import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./Modal.css";

export default function Modal(props) {
  if (!props.show) {
    return null;
  }
  return createPortal(
    <>
      <dialog
        className={clsx(props.className, "modal")}
        aria-labelledby="modal-heading"
        aria-modal
        open
      >
        <div
          className={
            props.splashpageForm
              ? "modal-header__splashpageForm"
              : "modal-header"
          }
        >
          <h1
            id="modal-heading"
            className={clsx(props.headingClassName, "modal__heading")}
          >
            {props.heading}
          </h1>
        </div>
        {props.children}
      </dialog>
      <div className="modal-overlay"></div>
    </>,
    document.body
  );
}

Modal.propTypes = {
  show: PropTypes.bool,
  heading: PropTypes.string.isRequired,
  headingClassName: PropTypes.string,
  className: PropTypes.string,
  splashpageForm: PropTypes.bool,
};

Modal.defaultProps = {
  show: false,
};
