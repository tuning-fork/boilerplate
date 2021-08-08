import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Accordion, {
  AccordionItem,
  AccordionItemHeader,
  AccordionItemPanel,
} from "../Accordion";
import "./AccordionTable.css";

export default function AccordionTable(props) {
  const { columns, data, className } = props;

  return (
    <Accordion as="ol" className={clsx(className, "accordion-table")}>
      <li>
        <div className="accordion-table__row-header accordion-table__row-header--first">
          <div className="accordion-table__cell">
            {/* Empty cell to align with Accordion icon */}
          </div>
          {columns.map((column, index) => (
            <div className="accordion-table__cell" key={`column-${index}`}>
              {column.Header}
            </div>
          ))}
        </div>
      </li>
      {data.map((row, index) => (
        <AccordionItem as="li" key={index}>
          <AccordionItemHeader
            heading="h6"
            buttonClassName="accordion-table__row-header"
          >
            {columns.map((column, index) => (
              <div className="accordion-table__cell" key={index}>
                {row[column.accessor]}
              </div>
            ))}
          </AccordionItemHeader>
          <AccordionItemPanel className="accordion-table__row-panel">
            {row._expandableContent || "hi"}
          </AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

AccordionTable.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

AccordionTable.defaultProps = {};
