import React, { createPortal } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./Modal.css";

export default function Modal(props) {
  if (!props.show) {
    return null;
  }
  return createPortal(
    <>
      <dialog className="modal" aria-labelledby="modal-heading" aria-modal open>
        <h1
          id="modal-heading"
          className={clsx(props.headingClassName, "modal__heading")}
        >
          {props.heading}
        </h1>
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
};

Modal.defaultProps = {
  show: false,
};
