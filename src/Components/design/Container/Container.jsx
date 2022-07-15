import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./Container.css";

export default function Container(props) {
  return (
    <props.as
      className={clsx(
        props.className,
        "container",
        props.centered && "container--centered"
      )}
    >
      {props.children}
    </props.as>
  );
}

Container.propTypes = {
  /**
   * Element to use for container.
   */
  as: PropTypes.string,
  centered: PropTypes.bool,
  className: PropTypes.string,
};

Container.defaultProps = {
  as: "div",
  centered: false,
};
