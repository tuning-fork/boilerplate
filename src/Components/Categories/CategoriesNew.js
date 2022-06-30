import React, { useState } from "react";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import Modal from "../design/Modal/Modal";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import { createCategory } from "../../Services/Organizations/CategoriesService";
import "./CategoriesNew.css";

export default function CategoriesNew(props) {
  const [name, setName] = useState("");
  const { currentOrganization, organizationClient } = useCurrentOrganization();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCategory = {
      name: name,
      organizationUuid: currentOrganization.uuid,
    };
    if (currentOrganization.uuid) {
      createCategory(organizationClient, newCategory)
        .then((category) => {
          // const { createdAt, updatedAt, uuid, name, organizationUuid } =
          //   category;
          // props.setCategories([
          //   ...props.currentCategories,
          //   {
          //     createdAt,
          //     updatedAt,
          //     uuid,
          //     name,
          //     organizationUuid,
          //   },
          // ]);
          props.onClose(category.uuid);
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
