import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useId } from "@react-aria/utils";
import DownArrowIcon from "@material-ui/icons/ExpandMore";
import Button from "../Button/Button";
import DropdownMenu from "./DropdownMenu";
import { optionPropType } from "./DropdownMenuItem";
import DropdownContext from "./DropdownContext";
import "./Dropdown.css";

export default function Dropdown(props) {
  const { labelText, className, defaultItem, placeholder, onChange, options } =
    props;
  const dropdownEl = useRef(null);

  const [selectedOption, setSelectedOption] = useState(defaultItem);
  const [focusedOption, setFocusedOption] = useState(options[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const labelId = useId();
  const context = {
    options,
    selectedOption,
    setSelectedOption,
    focusedOption,
    setFocusedOption,
    isMenuOpen,
    setIsMenuOpen,
    labelId,
  };

  // Hides menu when clicking outside dropdown
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!dropdownEl.current?.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick, false);

    return () => {
      document.removeEventListener("click", handleDocumentClick, false);
    };
  }, [isMenuOpen]);

  // Invoke onChange when selected item changes
  useEffect(() => {
    onChange?.(selectedOption);
  }, [onChange, selectedOption]);

  return (
    <DropdownContext.Provider value={context}>
      <div
        className={clsx(className, "dropdown")}
        ref={dropdownEl}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setIsMenuOpen(false);
          }
        }}
      >
        <span
          id={labelId}
          className="dropdown__label"
          onClick={() => setIsMenuOpen(true)}
        >
          {labelText}
        </span>
        <Button
          variant="none"
          className="dropdown__input"
          aria-haspopup="listbox"
          onMouseDown={(event) => {
            event.stopPropagation();
            event.preventDefault();

            setIsMenuOpen((isOpen) => !isOpen);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              setIsMenuOpen((isOpen) => !isOpen);
            }
          }}
        >
          {selectedOption ? (
            <span>{selectedOption.label}</span>
          ) : (
            <span className="dropdown__placeholder">{placeholder}</span>
          )}
          <DownArrowIcon />
        </Button>
        <DropdownMenu
          aria-expanded={isMenuOpen}
          hidden={!isMenuOpen}
          options={options}
        />
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.propTypes = {
  className: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(optionPropType).isRequired,
  defaultValue: optionPropType,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
};

Dropdown.defaultProps = {
  required: false,
  multiple: false,
};
