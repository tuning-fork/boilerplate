import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "../Button/Button";
import DropdownMiniContext from "./DropdownMiniContext";
import "./DropdownMini.css";

export default function DropdownMiniMenuItem(props) {
  const { option, index } = props;
  const {
    options,
    selectedOption,
    setSelectedOption,
    focusedOption,
    setFocusedOption,
    isMenuOpen,
    setIsMenuOpen,
    labelId,
  } = useContext(DropdownMiniContext);
  const menuItemButtonEl = useRef(null);
  const isSelected = option === selectedOption;
  const isFocused = option === focusedOption;

  useEffect(() => {
    if (isMenuOpen && isFocused) {
      menuItemButtonEl?.current?.focus();
    }
  }, [isFocused, isMenuOpen]);

  return (
    <li
      className={clsx(
        "dropdown-mini__menu-item",
        isSelected && "dropdown-mini__menu-item--selected"
      )}
      role="option"
      aria-selected={isSelected}
    >
      <Button
        ref={menuItemButtonEl}
        variant="none"
        aria-labelledby={labelId}
        onClick={() => {
          setSelectedOption(option);
          setIsMenuOpen(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowUp" && index > 0) {
            setFocusedOption(options[index - 1]);
          } else if (event.key === "ArrowDown" && index < options.length - 1) {
            setFocusedOption(options[index + 1]);
          }
        }}
      >
        {option.label}
      </Button>
    </li>
  );
}

export const optionPropType = PropTypes.shape({
  value: PropTypes.any.isRequired,
  label: PropTypes.string,
});

DropdownMiniMenuItem.propTypes = {
  option: optionPropType.isRequired,
  index: PropTypes.number.isRequired,
};

DropdownMiniMenuItem.defaultProps = {};
