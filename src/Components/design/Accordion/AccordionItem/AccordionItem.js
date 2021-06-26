import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import RightArrowIcon from "@material-ui/icons/ChevronRight";
import DownArrowIcon from "@material-ui/icons/ExpandMore";
import "./AccordionItem.css";

export default function AccordionItem(props) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className={clsx(props.className, "accordion-item")}>
      <header
        className="accordion-item__header"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <RightArrowIcon /> : <DownArrowIcon />}
        {props.title}
      </header>
      {!collapsed && <div>{props.children}</div>}
    </div>
  );
}

AccordionItem.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.element,
};

AccordionItem.defaultProps = {};
