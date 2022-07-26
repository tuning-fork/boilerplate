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
      className={clsx(props.className, props.panelPalette, "panel")}
      id="slice"
      aria-labelledby="panel-heading"
      aria-modal
      open
    >
      <div className="panel__background-image">
        {props.hide && (
          <div className="panel-cancel-button">
            <PanelCancelButton
              hide={
                props.currentBio && Object.values(props.currentBio).length
                  ? props.setCurrentBio({})
                  : props.hide
              }
            />
          </div>
        )}
        <div className="panel-content">{props.children}</div>
      </div>
    </div>
  );
}

Panel.propTypes = {
  show: PropTypes.bool,
  heading: PropTypes.string,
  headingClassName: PropTypes.string,
  className: PropTypes.string,
  panelPalette: PropTypes.string,
};

Panel.defaultProps = {
  show: false,
};
