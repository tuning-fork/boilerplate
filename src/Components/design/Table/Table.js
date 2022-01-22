import React, { useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import "./Table.css";

export default function Table(props) {
  const columns = useMemo(() => props.columns, [props.columns]);
  const data = useMemo(() => props.data, [props.data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const renderHeaderGroup = (headerGroup) => {
    return (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map(renderHeader)}
      </tr>
    );
  };

  const renderHeader = (column) => {
    return (
      <th {...column.getHeaderProps()} className="table__header">
        {column.render("Header")}
      </th>
    );
  };

  const renderRow = (row) => {
    // console.log("row", row);
    prepareRow(row);
    return <tr {...row.getRowProps()}>{row.cells.map(renderCell)}</tr>;
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
  // TODO: data: PropTypes.arrayOf(),
  // TODO: columns: PropTypes.arrayOf(),
};

Table.defaultProps = {};
