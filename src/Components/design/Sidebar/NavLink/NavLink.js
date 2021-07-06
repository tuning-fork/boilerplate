import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./NavLink.css";

export default function NavLink(props) {
  return (
    <a
      {...props}
      className={clsx(
        props.className,
        "navlink",
        props.active && "navlink--active",
        props.disabled && "navlink--disabled"
      )}
    >
      {"Hello!"}
    </a>
  );
}

NavLink.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

NavLink.defaultProps = {
  className: "",
  disabled: false,
  active: PropTypes.bool,
  onClick: () => {},
};
