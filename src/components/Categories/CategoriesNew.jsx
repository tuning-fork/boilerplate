import React, { useState } from "react";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import Modal from "../design/Modal/Modal";
import { useCurrentOrganization } from "../../contexts/currentOrganizationContext";
import { createCategory } from "../../services/Organizations/CategoriesService";
import "./CategoriesNew.css";

export default function CategoriesNew(props) {
  const [name, setName] = useState("");
  const { currentOrganization, organizationClient } = useCurrentOrganization();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCategory = {
      name: name,
      organizationId: currentOrganization.id,
    };
    if (currentOrganization.id) {
      createCategory(organizationClient, newCategory)
        .then((category) => {
          // const { createdAt, updatedAt, id, name, organizationId } =
          //   category;
          // props.setCategories([
          //   ...props.currentCategories,
          //   {
          //     createdAt,
          //     updatedAt,
          //     id,
          //     name,
          //     organizationId,
          //   },
          // ]);
          props.onClose(category.id);
        })
        .catch((error) => {
          console.error("category creation error", error);
        });
    }
  };

  return (
    <Modal
      show={props.show}
      heading="Add New Category"
      className="categories-new"
    >
      <form onSubmit={handleSubmit}>
        <TextBox
          labelText="Name"
          onChange={(event) => setName(event.target.value)}
        />
        <div className="categories-new__button-group">
          <Button variant="outlined" onClick={props.onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  );
}
