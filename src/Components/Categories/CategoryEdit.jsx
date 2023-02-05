import React from "react";
import { useMutation } from "react-query";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import "./CategoryEdit.css";
import * as CategoriesService from "../../Services/Organizations/CategoriesService";
import CategoryForm from "./CategoryForm";
import Modal from "../design/Modal/Modal";

export default function CategoryEdit(props) {
  const { organizationClient } = useCurrentOrganization();

  const { mutate: updateCategory } = useMutation(
    (newCategoryFields) =>
      CategoriesService.updateCategory(
        organizationClient,
        newCategoryFields.id,
        newCategoryFields
      ),
    {
      onSuccess: () => {
        alert("Category edited!");
        props.onClose();
      },
    }
  );

  const handleEditCategory = (newCategoryFields) => {
    updateCategory({
      ...newCategoryFields,
      name: newCategoryFields.name,
    });
  };

  const handleCancel = () => {
    props.onClose();
  };

  return (
    <div className="category-edit">
      <Modal
        show={props.show}
        heading="Edit Category"
        className="category-edit"
      >
        <CategoryForm
          category={props.category}
          onSubmit={handleEditCategory}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}
