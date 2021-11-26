import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { MdChevronRight, MdExpandMore } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import AccordionItemContext from "./AccordionItemContext";
import Button from "../../Button/Button";
import DropdownMini from "../../DropdownMini/DropdownMini";

export default function AccordionItemHeader(props) {
  const { heading: Heading, className, children, dropDownProps } = props;
  const { expanded, setExpanded, panelId, headerId } =
    useContext(AccordionItemContext);
  const ExpandIcon = expanded ? MdExpandMore : MdChevronRight;
  const SeeMoreIcon = BsThreeDotsVertical;

  return (
    <Heading className={clsx(className, "accordion-item__header")}>
      <Button
        id={headerId}
        variant="none"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls={panelId}
        className={clsx(props.buttonClassName, "accordion-item__header-button")}
      >
        <ExpandIcon className="accordion-item__icon" />
        {children}
        <DropdownMini
          className="accordion-item__see-more"
          labelText={dropDownProps.labelText}
          onChange={() => {
            console.log("banana");
          }}
          options={dropDownProps.options}
          value={dropDownProps.placeholder}
        />
      </Button>
    </Heading>
  );
}

AccordionItemHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  heading: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
};

AccordionItemHeader.defaultProps = {
  heading: "h1",
};
