import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./Modal.css";
import ModalCancelButton from "./ModalCancelButton";

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
        {props.hide && (
          <div className="modal-cancel-button">
            <ModalCancelButton hide={props.hide} />
          </div>
        )}

        <div
          // className={clsx(
          //   props.SplashPageForm
          //     ? "modal_header--SplashPageForm"
          //     : "modal-header"
          // )}
          className={
            props.SplashPageForm
              ? "modal-header__SplashPageForm"
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
  SplashPageForm: PropTypes.bool,
};

Modal.defaultProps = {
  show: false,
};
