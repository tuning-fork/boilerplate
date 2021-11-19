import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Accordion, {
  AccordionItem,
  AccordionItemHeader,
  AccordionItemPanel,
} from "../Accordion";
import "./AccordionTable.css";
import formatDate from "../../../../Helpers/formatDate";
import daysLeft from "../../../../Helpers/daysLeft";
import DeadlineClock from "../../DeadlineClock/DeadlineClock";
import Dropdown from "../../Dropdown/Dropdown";
import DropdownMini from "../../DropdownMini/DropdownMini";

export default function AccordionTable(props) {
  const { columns, data, className, dropDownProps } = props;

  console.log("data", data);

  const dateTypes = ["created_at", "updated_at", "deadline"];
  const isMessage = true;

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
      {data.map((row, index) => {
        return (
          <AccordionItem as="li" key={index}>
            <AccordionItemHeader
              heading="h6"
              buttonClassName="accordion-table__row-header"
            >
              {columns.map((column, index) => {
                const cell = row[column.accessor];
                const isDate = dateTypes.includes(column.accessor);
                const isDeadline = column.accessor === "deadline";
                const isNumber = typeof cell === "number";
                const days =
                  column.accessor === "deadline" ? daysLeft(cell) : null;
                console.log("days", days);
                return (
                  <div
                    key={index}
                    className={clsx(
                      "accordion-table__cell",
                      isNumber && "accordion-table__cell--number",
                      isMessage && "accordion-table__cell--message"
                    )}
                  >
                    <DeadlineClock deadline={isDeadline} days={days} />
                    {isDate ? formatDate(cell) : cell}
                  </div>
                );
              })}
            </AccordionItemHeader>
            <AccordionItemPanel className="accordion-table__row-panel">
              {row._expandableContent}
            </AccordionItemPanel>
            {/* <Dropdown
              labelText={dropDownProps.labelText}
              onChange={() => {
                console.log("banana");
              }}
              options={dropDownProps.options}
              value={dropDownProps.placeholder}
            /> */}
            <DropdownMini
              labelText={dropDownProps.labelText}
              onChange={() => {
                console.log("banana");
              }}
              options={dropDownProps.options}
              value={dropDownProps.placeholder}
            />
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

AccordionTable.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

AccordionTable.defaultProps = {};
