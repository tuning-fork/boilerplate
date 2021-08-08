import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import AccordionItemContext from "./AccordionItemContext";

export default function AccordionItemPanel(props) {
  const { expanded, panelId, headerId } = useContext(AccordionItemContext);
  const { className, children } = props;

  return (
    <section
      id={panelId}
      aria-labelledby={headerId}
      hidden={!expanded}
      className={clsx(className, "accordion-item__panel")}
    >
      {children}
    </section>
  );
}

AccordionItemPanel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

AccordionItemPanel.defaultProps = {};
