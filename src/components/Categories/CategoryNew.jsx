import React from "react";
import { useMutation } from "react-query";
import Modal from "../design/Modal/Modal";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as CategoriesService from "../../services/Organizations/CategoriesService";
import CategoryForm from "./CategoryForm";
import "./CategoryNew.css";

export default function CategoryNew(props) {
  const { currentOrganization, organizationClient } = useCurrentOrganization();

  const { mutate: createCategory } = useMutation(
    (newCategoryFields) =>
      CategoriesService.createCategory(organizationClient, newCategoryFields),
    {
      onSuccess: (category) => {
        alert("Category created!");
        props.onClose(category);
      },
    }
  );

  const handleSubmit = (categoryFields) => {
    createCategory({
      ...categoryFields,
      organizationId: currentOrganization.id,
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
