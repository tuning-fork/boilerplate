import React, { useMemo } from "react";
import { useTable } from "react-table";

export default function BoilerplatesTable(props) {
  const columns = useMemo(
    () => [
      { Header: "Title", accessor: "title" },
      { Header: "Category", accessor: "category_name" },
      { Header: "Word Count", accessor: "wordcount" },
      { Header: "Date Created", accessor: "created_at" },
      { Header: "Last Modified", accessor: "updated_at" },
    ],
    []
  );
  const boilerplates = useMemo(() => props.boilerplates, [props.boilerplates]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data: boilerplates });

  const header = headerGroups.map((headerGroup) => (
    <tr {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column) => (
        <th {...column.getHeaderProps()}>
          {column.render("Header")}
        </th>
      ))}
    </tr>
  ));
  const body = rows.map((row) => {
    prepareRow(row);
    return (
      <tr {...row.getRowProps()}>
        {row.cells.map((cell) => (
          <td {...cell.getCellProps()}>
            {cell.render("Cell")}
          </td>
        ))}
      </tr>
    );
  });

  return (
    <table {...getTableProps()}>
      <thead>{header}</thead>
      <tbody {...getTableBodyProps()}>{body}</tbody>
    </table>
  );
}
