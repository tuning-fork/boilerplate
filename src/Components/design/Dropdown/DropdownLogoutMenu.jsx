import React from "react";
import PropTypes from "prop-types";
import DropdownMenuItem, { optionPropType } from "./DropdownMenuItem";
import "./Dropdown.css";

export default function DropdownLogoutMenu(props) {
  const { options, ...restProps } = props;

  return (
    <ul {...restProps} className="dropdown-logout__menu" role="listbox">
      {options?.map((option, index) => (
        <DropdownMenuItem key={index} option={option} index={index} />
      ))}
    </ul>
  );
}

DropdownLogoutMenu.propTypes = {
  options: PropTypes.arrayOf(optionPropType).isRequired,
};

DropdownLogoutMenu.defaultProps = {};
