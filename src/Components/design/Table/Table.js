import React, { useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTable, useSortBy } from "react-table";
import { useHistory } from "react-router-dom";
import "./Table.css";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

export default function Table(props) {
  const columns = useMemo(() => props.columns, [props.columns]);
  const data = useMemo(() => props.data, [props.data]);
  const history = useHistory();

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
        <div
          style={{ display: "flex", direction: "row", alignContent: "center" }}
        >
          {column.render("Header")}
          <span style={{ height: "24px", width: "24px" }}>
            {column.isSorted ? (
              column.isSortedDesc ? (
                <MdOutlineKeyboardArrowDown className="table__header__icon" />
              ) : (
                <MdOutlineKeyboardArrowUp className="table__header__icon" />
              )
            ) : (
              ""
            )}
          </span>
        </div>
      </th>
    );
  };

  const addLinkToRow = (boilerplateId) => {
    return history.push(
      buildOrganizationsLink(`/boilerplates/${boilerplateId}`)
    );
  };

  const openModalForRow = (rowOriginalId) => {
    //will be built out for categories and funding orgs tables
    console.log("modal is open now!");
  };

  const renderRow = (row) => {
    // console.log("row", row);
    prepareRow(row);
    return (
      <tr
        onClick={props.rowOnClick && (() => props.rowOnClick(row.original.id))}
        {...row.getRowProps()}
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
};

Table.defaultProps = {};
