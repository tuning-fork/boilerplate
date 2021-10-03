import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Accordion, {
  AccordionItem,
  AccordionItemHeader,
  AccordionItemPanel,
} from "../Accordion";
import Button from "../../Button/Button";
import "./AccordionTable.css";

export default function AccordionTable(props) {
  const { columns, data, className, handleClickPasteBoilerplate } = props;
  console.log(data);

  return (
    <Accordion as="ol" className={clsx(className, "accordion-table")}>
      <li>
        <div className="accordion-table__row-header accordion-table__row-header--first">
          <div className="accordion-table__cell">
            {/* Empty cell to align with Accordion icon */}
          </div>
          {columns.map((column, index) => {
            const isNumber = typeof data[0]?.[column.accessor] === "number";

            return (
              <div
                key={index}
                className={clsx(
                  "accordion-table__cell",
                  isNumber && "accordion-table__cell--number"
                )}
              >
                {column.Header}
              </div>
            );
          })}
        </div>
      </li>
      {data.map((row, index) => (
        <div>
          <AccordionItem as="li" key={index}>
            <AccordionItemHeader
              heading="h6"
              buttonClassName="accordion-table__row-header"
            >
              {columns.map((column, index) => {
                const cell = row[column.accessor];
                const isNumber = typeof cell === "number";

                return (
                  <div
                    key={index}
                    className={clsx(
                      "accordion-table__cell",
                      isNumber && "accordion-table__cell--number"
                    )}
                  >
                    {cell}
                  </div>
                );
              })}
            </AccordionItemHeader>
            <AccordionItemPanel className="accordion-table__row-panel">
              {/* {row._expandableContent || "hi"} */}
              {row.text || "hi"}
              {/* <Button onClick={() => handlePasteBoilerplate(row.id)}> */}
              {/* <Button onClickPasteBoilerplate={() => handlePasteBoilerplate(row.id)}> */}
              <Button onClick={() => handleClickPasteBoilerplate(row)}>
                {" "}
                Paste Boilerplate
              </Button>
            </AccordionItemPanel>
          </AccordionItem>
        </div>
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
