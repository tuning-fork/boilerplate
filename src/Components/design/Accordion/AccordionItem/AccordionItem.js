import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import RightArrowIcon from "@material-ui/icons/ChevronRight";
import DownArrowIcon from "@material-ui/icons/ExpandMore";
import { useId } from "react-aria";
import Button from "../../Button/Button";
import "./AccordionItem.css";

export default function AccordionItem(props) {
  const [expanded, setExpanded] = useState(false);
  const Icon = expanded ? DownArrowIcon : RightArrowIcon;
  const headerButtonId = useId();
  const panelId = useId();

  return (
    <div className={clsx(props.className, "accordion-item")}>
      <props.heading className="accordion-item__heading">
        <Button
          id={headerButtonId}
          variant="none"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={panelId}
        >
          <Icon className="accordion-item__icon" />
          {props.title}
        </Button>
      </props.heading>
      <section id={panelId} aria-labelledby={headerButtonId} hidden={!expanded}>
        {props.children}
      </section>
    </div>
  );
}

AccordionItem.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]).isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

AccordionItem.defaultProps = {};
