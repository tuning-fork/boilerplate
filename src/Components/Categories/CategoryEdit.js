import React from "react";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import "./CategoryEdit.css";
import * as CategoriesService from "../../Services/Organizations/CategoriesService";
import CategoryForm from "./CategoryForm";
import Modal from "../design/Modal/Modal";

export default function CategoryEdit(props) {
  const { organizationClient } = useCurrentOrganization();

  const handleSubmit = (categoryFields) => {
    CategoriesService.updateCategory(organizationClient, props.category.id, {
      ...categoryFields,
      organizationId: organizationClient,
    })
      .then((category) => {
        if (category.id) {
          props.onClose();
        }
      })
      .catch((error) => {
        console.error("category update error", error);
      });
  };

  const handleCancel = () => {
    props.onClose();
  };

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    // console.log("you deleted this category!");
    // if (confirm(`Are you sure you want to delete this category?`)) {
    //   CategoriesService.deleteCategory(organizationClient, props.category.id)
    //     .then(() => {
    //       alert("Category deleted!");
    //       props.onClose();
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       alert(
    //         "Eek! Something went wrong when deleting the category. Try again soon."
    //       );
    //     });
    // }
    if (confirm(`Are you sure you want to delete this category?`)) {
      CategoriesService.updateCategory(organizationClient, props.category.id, {
        archived: true,
      })
        .then(() => {
          alert("Category deleted!");
          props.onClose();
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Eek! Something went wrong when deleting the category. Try again soon."
          );
        });
    }
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
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      </Modal>
    </div>
  );
}