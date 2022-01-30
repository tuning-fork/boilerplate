import React, { useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTable, useSortBy } from "react-table";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import "./Table.css";

export default function Table(props) {
  const columns = useMemo(() => props.columns, [props.columns]);
  const data = useMemo(() => props.data, [props.data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  const renderHeaderGroup = (headerGroup) => {
    return (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map(renderHeader)}
      </tr>
    );
  };

  const renderHeader = (column) => {
    return (
      <th
        {...column.getHeaderProps(column.getSortByToggleProps())}
        className="table__header"
      >
        <div className="table__header-container">
          {column.render("Header")}
          {column.isSorted &&
            (column.isSortedDesc ? (
              <MdOutlineKeyboardArrowDown />
            ) : (
              <MdOutlineKeyboardArrowUp />
            ))}
        </div>
      </th>
    );
  };

  const renderRow = (row) => {
    prepareRow(row);
    return (
      <tr
        {...row.getRowProps()}
        onClick={() => props.onRowClick(row)}
        className="table__row"
      >
        {row.cells.map(renderCell)}
      </tr>
    );
  };

  const renderCell = (cell) => {
    return (
      <td {...cell.getCellProps()} className="table__cell">
        {cell.render("Cell")}
      </td>
    );
  };

  return (
    <table {...getTableProps()} className={clsx(props.className, "table")}>
      <thead>{headerGroups.map(renderHeaderGroup)}</thead>
      <tbody {...getTableBodyProps()}>{rows.map(renderRow)}</tbody>
    </table>
  );
}

Table.propTypes = {
  className: PropTypes.string,
  onRowClick: PropTypes.func,
};

Table.defaultProps = {
  onRowClick: () => {},
};
