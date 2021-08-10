import React, { useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTable } from "react-table";
import RightArrowIcon from "@material-ui/icons/ChevronRight";
import DownArrowIcon from "@material-ui/icons/ExpandMore";
import "./AccordionTable.css";

export default function AccordionTable(props) {
  const columns = useMemo(() => props.columns, [props.columns]);
  const data = useMemo(() => props.data, [props.data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const renderHeaderGroup = (headerGroup) => {
    return (
      <tr {...headerGroup.getHeaderGroupProps()} className="table__header-row">
        {headerGroup.headers.map(renderHeader)}
      </tr>
    );
  };

  const renderHeader = (column) => {
    const isNumber = typeof column.accessor(data[0]) === "number";

    return (
      <th
        {...column.getHeaderProps()}
        className={clsx("table__header", isNumber && "table__header--number")}
      >
        {column.render("Header")}
      </th>
    );
  };

  const renderRow = (row) => {
    prepareRow(row);

    return (
      <>
        <tr {...row.getRowProps()} className="table__row">
          {row.cells.map(renderCell)}
        </tr>
        <tr {...row.getRowProps()}>
          <td>
            Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </td>
        </tr>
      </>
    );
  };

  const renderCell = (cell) => {
    const isNumber = typeof cell.value === "number";

    return (
      <td
        {...cell.getCellProps()}
        className={clsx("table__cell", isNumber && "table__cell--number")}
      >
        <DownArrowIcon style={{}} />
        {cell.render("Cell")}
      </td>
    );
  };

  return (
    <div>
      <table {...getTableProps()} className={clsx(props.className, "table")}>
        <thead>{headerGroups.map(renderHeaderGroup)}</thead>
        <tbody {...getTableBodyProps()}>{rows.map(renderRow)}</tbody>
      </table>
    </div>
  );
}

AccordionTable.propTypes = {
  className: PropTypes.string,
};

AccordionTable.defaultProps = {};
