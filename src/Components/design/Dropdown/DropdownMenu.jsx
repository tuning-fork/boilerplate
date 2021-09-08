import React from "react";
import PropTypes from "prop-types";
import DropdownMenuItem, { optionPropType } from "./DropdownMenuItem";
import "./Dropdown.css";

export default function DropdownMenu(props) {
  const { options, ...restProps } = props;

  return (
    <ul {...restProps} className="dropdown__menu" role="listbox">
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
