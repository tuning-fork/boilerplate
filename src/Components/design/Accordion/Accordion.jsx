import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import "./Accordion.css";

export { default as AccordionItem } from "./AccordionItem/AccordionItem";
export { default as AccordionItemHeader } from "./AccordionItem/AccordionItemHeader";
export { default as AccordionItemPanel } from "./AccordionItem/AccordionItemPanel";

export default function Accordion(props) {
  const { as: Component, className, children } = props;

  return (
    <Component className={clsx(className, "accordion")}>{children}</Component>
  );
}

Accordion.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  as: PropTypes.node,
};

Accordion.defaultProps = {
  as: "div",
};
