import React from "react";
import { useMutation } from "react-query";
import Modal from "../design/Modal/Modal";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as CategoriesService from "../../Services/Organizations/CategoriesService";
import CategoryForm from "./CategoryForm";
import "./CategoryNew.css";

export default function CategoryNew(props) {
  const { organizationClient } = useCurrentOrganization();

  const { mutate: createCategory } = useMutation(
    (categoryFields) =>
      CategoriesService.createCategory(organizationClient, categoryFields),
    {
      onSuccess: () => {
        alert("Category created!");
        props.onClose();
      },
    }
  );

  function handleCreateCategory(newCategoryFields) {
    createCategory({
      name: newCategoryFields.name,
    });
  }

  const handleCancel = () => {
    props.onClose();
  };

  return (
    <Modal
      show={props.show}
      heading="Add New Category"
      className="category-new"
    >
      <CategoryForm onSubmit={handleCreateCategory} onCancel={handleCancel} />
    </Modal>
  );
}
