import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useId } from "react-aria";
import AccordionItemContext from "./AccordionItemContext";
import "./AccordionItem.css";
import Dropdown from "../../Dropdown/Dropdown";

export default function AccordionItem(props) {
  const { as: Component, className, children } = props;
  const [expanded, setExpanded] = useState(false);
  const state = {
    expanded,
    setExpanded,
    headerId: useId(),
    panelId: useId(),
  };

  return (
    <AccordionItemContext.Provider value={state}>
      <Component className={clsx(className, "accordion-item")}>
        {children}
      </Component>
      {/* <Dropdown /> */}
    </AccordionItemContext.Provider>
  );
}

AccordionItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  as: PropTypes.node,
};

AccordionItem.defaultProps = {
  as: "div",
};
