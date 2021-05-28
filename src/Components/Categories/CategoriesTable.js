import { format as formatDate, parseISO } from "date-fns";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import "./CategoriesTable.css";
//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./../Elements/Modal";
import CategoryEditForm from "./../Categories/CategoryEditForm";
import {
  updateCategory,
  deleteCategory,
} from "../../Services/Organizations/CategoriesService";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";

library.add(faTrashAlt);
library.add(faEdit);

export default function CategoriesTable(props) {
  const renderDateColumn = (dateString) =>
    formatDate(parseISO(dateString), "PP");

  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});

  const [showCategoryEdit, setShowCategoryEdit] = useState(false);
  const handleClose = () => {
    setShowCategoryEdit(false);
  };
  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationClient,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  const handleShowCategoryEdit = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setShowCategoryEdit(true);
  };

  const handleSubmitEditCategory = ({ newName }, id) => {
    console.log(id);
    updateCategory(organizationClient, id, {
      name: newName,
      organization_id: currentOrganizationId,
    })
      .then((category) => {
        setName(name);
        handleClose();
      })
      .catch((error) => {
        console.log("category update error", error);
      });
  };

  const handleCancel = (event) => {
    handleClose();
  };

  const handleCategoryDelete = (categoryId) => {
    console.log("deleted!");
  };

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

    // const { id } = row.original;

    return (
      <tr {...row.getRowProps()}>
        {row.cells.map((cell) => {
          const renderedCell = (() => {
            return cell.render("Cell");
          })();

          return <td {...cell.getCellProps()}>{renderedCell}</td>;
        })}
        <FontAwesomeIcon
          icon={faEdit}
          style={{
            color: "black",
            fontSize: "1.5rem",
          }}
          onClick={() => handleShowCategoryEdit(row)}
        />
        <FontAwesomeIcon
          icon={faTrashAlt}
          style={{
            color: "black",
            fontSize: "1.5rem",
          }}
          onClick={() => handleCategoryDelete(row.id)}
        />
      </tr>
    );
  });

  return (
    <div>
      <table {...getTableProps()} className="CategoriesTable">
        <thead>{header}</thead>
        <tbody {...getTableBodyProps()}>{body}</tbody>
      </table>
      <Modal show={showCategoryEdit}>
        <CategoryEditForm
          category={selectedCategory}
          onSubmit={handleSubmitEditCategory}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}
