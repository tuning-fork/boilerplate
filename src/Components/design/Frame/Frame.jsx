import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./Frame.css";

export default function Frame(props) {
  return (
    <div className={clsx(props.className, "frame")} id="slice" aria-modal open>
      <div className="frame-content">{props.children}</div>
    </div>
  );
}

Frame.propTypes = {
  className: PropTypes.string,
};
