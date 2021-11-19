import React from "react";
import PropTypes from "prop-types";
import DropdownMiniMenuItem, { optionPropType } from "./DropdownMiniMenuItem";
import "./DropdownMini.css";

export default function DropdownMiniMenu(props) {
  const { options, ...restProps } = props;

  return (
    <ul {...restProps} className="dropdown-mini__menu" role="listbox">
      {options?.map((option, index) => (
        <DropdownMiniMenuItem key={index} option={option} index={index} />
      ))}
    </ul>
  );
}

DropdownMiniMenu.propTypes = {
  options: PropTypes.arrayOf(optionPropType).isRequired,
};

DropdownMiniMenu.defaultProps = {};
