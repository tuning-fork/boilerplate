import React from "react";
// import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./Panel.css";
import PanelCancelButton from "./PanelCancelButton";

export default function Panel(props) {
  if (!props.show) {
    return null;
  }
  return (
    <div
      className={clsx(props.className, "panel")}
      id="slice"
      aria-labelledby="panel-heading"
      aria-modal
      open
    >
      {props.hide && (
        <div className="panel-cancel-button">
          <PanelCancelButton hide={props.hide} />
        </div>
      )}

      <div className="panel-header">
        <h1
          id="panel-heading"
          className={clsx(props.headingClassName, "panel__heading")}
        >
          {props.heading}
        </h1>
      </div>
      <div className="panel-content">{props.children}</div>
    </div>
  );
}

Panel.propTypes = {
  show: PropTypes.bool,
  heading: PropTypes.string.isRequired,
  headingClassName: PropTypes.string,
  className: PropTypes.string,
  splashpageForm: PropTypes.bool,
};

Panel.defaultProps = {
  show: false,
};
