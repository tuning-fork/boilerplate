import React from "react";
import Modal from "../../../components/design/Modal/Modal";
import { useCurrentOrganization } from "../../../contexts/currentOrganizationContext";
import { createCategory } from "../../../services/p0/Organizations/CategoriesService";
import CategoryForm from "../CategoryForm/CategoryForm";
import "./CategoryNew.css";

export default function CategoryNew(props) {
  const { currentOrganization, organizationClient } = useCurrentOrganization();

  const handleSubmit = (categoryFields) => {
    createCategory(organizationClient, {
      ...categoryFields,
      organizationId: currentOrganization.id,
    })
      .then((category) => {
        if (category.id) {
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
