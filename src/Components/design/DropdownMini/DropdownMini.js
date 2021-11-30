import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { BsThreeDotsVertical } from "react-icons/bs";
import Button from "../Button/Button";
import DropdownMiniMenu from "./DropdownMiniMenu";
import { optionPropType } from "./DropdownMiniMenuItem";
import DropdownMiniContext from "./DropdownMiniContext";
import "./DropdownMini.css";

export default function DropdownMini(props) {
  const { className, onChange, options, placeholder, value } = props;
  const dropdownEl = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [focusedOption, setFocusedOption] = useState(options[0]);
  const selectedOption =
    options.find((option) => option.value === value) || null;
  const context = {
    focusedOption,
    isMenuOpen,
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
    <DropdownMiniContext.Provider value={context}>
      <div
        className={
          isMenuOpen
            ? clsx(className, "dropdown-mini-open")
            : clsx(className, "dropdown-mini")
        }
        ref={dropdownEl}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setIsMenuOpen(false);
          }
        }}
      >
        <div
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
          <BsThreeDotsVertical />
        </div>
        <DropdownMiniMenu
          aria-expanded={isMenuOpen}
          hidden={!isMenuOpen}
          options={options}
        />
      </div>
    </DropdownMiniContext.Provider>
  );
}

DropdownMini.propTypes = {
  className: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(optionPropType).isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

DropdownMini.defaultProps = {
  multiple: false,
  required: false,
};
