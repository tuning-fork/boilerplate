import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { MdChevronRight, MdExpandMore } from "react-icons/md";
import AccordionItemContext from "./AccordionItemContext";
import Button from "../../Button/Button";

export default function AccordionItemHeader(props) {
  const { heading: Heading, className, children } = props;
  const { expanded, setExpanded, panelId, headerId } =
    useContext(AccordionItemContext);
  const Icon = expanded ? MdExpandMore : MdChevronRight;

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
        <Icon className="accordion-item__icon" />
        {children}
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
