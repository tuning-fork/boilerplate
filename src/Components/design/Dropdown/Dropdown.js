import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useId } from "@react-aria/utils";
// import DownArrowIcon from "@material-ui/icons/ExpandMore";
import Button from "../Button/Button";
import DropdownMenu from "./DropdownMenu";
import { optionPropType } from "./DropdownMenuItem";
import DropdownContext from "./DropdownContext";
import "./Dropdown.css";

export default function Dropdown(props) {
  const { className, onChange, options, placeholder, value, labelText } = props;
  const dropdownEl = useRef(null);

  const labelId = useId();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [focusedOption, setFocusedOption] = useState(options[0]);
  const selectedOption =
    options.find((option) => option.value === value) || null;
  const context = {
    focusedOption,
    isMenuOpen,
    labelId,
    options,
    selectedOption,
    setFocusedOption,
    setIsMenuOpen,
    setSelectedOption: onChange,
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
          {/* <DownArrowIcon /> */}
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
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(optionPropType).isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

Dropdown.defaultProps = {
  multiple: false,
  required: false,
};
