import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import DropdownMenuItem, { optionPropType } from "./DropdownMenuItem";
import "./Dropdown.css";

export default function DropdownMenu(props) {
  const { options, className, ...restProps } = props;

  return (
    <ul
      {...restProps}
      className={clsx(className, "dropdown__menu")}
      role="listbox"
      data-testid="drop-down-mini-menu"
    >
      {options?.map((option, index) => (
        <DropdownMenuItem key={index} option={option} index={index} />
      ))}
    </ul>
  );
}

DropdownMenu.propTypes = {
  options: PropTypes.arrayOf(optionPropType).isRequired,
};

DropdownMenu.defaultProps = {};
