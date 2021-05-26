import { format as formatDate, parseISO } from "date-fns";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import "./CategoriesTable.css";

const renderDateColumn = (dateString) => formatDate(parseISO(dateString), "PP");

export default function CategoriesTable(props) {
  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      {
        Header: "Date Created",
        accessor: (row) => renderDateColumn(row.created_at),
      },
      {
        Header: "Last Modified",
        accessor: (row) => renderDateColumn(row.updated_at),
      },
    ],
    []
  );
  const categories = useMemo(() => props.categories, [props.categories]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: categories });

  const header = headerGroups.map((headerGroup) => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column) => (
        <th {...column.getHeaderProps()}>{column.render("Header")}</th>
      ))}
    </tr>
  ));
  const body = rows.map((row) => {
    prepareRow(row);

    const { id } = row.original;

    return (
      <tr {...row.getRowProps()}>
        {row.cells.map((cell) => {
          const renderedCell = (() => {
            if (cell.column.Header === "Name") {
              return <mark>{cell.render("Cell")}</mark>;
            }
            return cell.render("Cell");
          })();

          return <td {...cell.getCellProps()}>{renderedCell}</td>;
        })}
      </tr>
    );
  });

  return (
    <table {...getTableProps()} className="CategoriesTable">
      <thead>{header}</thead>
      <tbody {...getTableBodyProps()}>{body}</tbody>
    </table>
  );
}
