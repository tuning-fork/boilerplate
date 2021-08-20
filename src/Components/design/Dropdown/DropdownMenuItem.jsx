import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Button from "../Button/Button";
import DropdownContext from "./DropdownContext";
import "./Dropdown.css";

export default function DropdownMenuItem(props) {
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
  } = useContext(DropdownContext);
  const menuItemButtonEl = useRef(null);
  const isSelected = option.value === selectedOption?.value;
  const isFocused = option.value === focusedOption?.value;

  useEffect(() => {
    if (isMenuOpen && isFocused) {
      menuItemButtonEl?.current?.focus();
    }
  }, [isFocused, isMenuOpen]);

  return (
    <li
      className={clsx(
        "dropdown__menu-item",
        isSelected && "dropdown__menu-item--selected"
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

DropdownMenuItem.propTypes = {
  option: optionPropType.isRequired,
  index: PropTypes.number.isRequired,
};

DropdownMenuItem.defaultProps = {};
