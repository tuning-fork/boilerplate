import React from "react";
import Modal from "../design/Modal/Modal";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import { createCategory } from "../../Services/Organizations/CategoriesService";
import CategoryForm from "./CategoryForm";
import "./CategoryNew.css";

export default function CategoryNew(props) {
  const { currentOrganization, organizationClient } = useCurrentOrganization();

  const handleSubmit = (categoryFields) => {
    createCategory(organizationClient, {
      ...categoryFields,
      organizationUuid: currentOrganization.uuid,
    })
      .then((category) => {
        debugger;
        if (category.uuid) {
          props.onClose();
        }
      })
      .catch((error) => {
        console.error("category creation error", error);
      });
  };

  const handleCancel = () => {
    props.onClose();
  };

  return (
    <Modal
      show={props.show}
      heading="Add New Category"
      className="category-new"
    >
      <CategoryForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </Modal>
  );
}
