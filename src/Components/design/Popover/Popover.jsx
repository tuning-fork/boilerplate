import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./Popover.css";

export default function Popover(props) {
  const [hovering, setHovering] = useState(false);
  const { children, className, text, direction = "left" } = props;

  return (
    <div
      className={clsx("popover", `popover--${direction}`, className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {children}
      {hovering && <div className="popover__content">{text}</div>}
    </div>
  );
}

Popover.propTypes = {
  text: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(["left", "right"]),
};
