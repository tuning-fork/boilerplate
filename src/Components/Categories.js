import React, { useState, useEffect } from "react";
import CategoriesNew from "./Categories/CategoriesNew";
import Modal from "./Elements/Modal";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCurrentOrganization } from "../Contexts/currentOrganizationContext";
import { getAllCategories } from "../Services/Organizations/CategoriesService";
import {
  updateCategory,
  deleteCategory,
} from "../Services/Organizations/CategoriesService";
import CategoriesTable from "./Categories/CategoriesTable";
import CategoryEditForm from "./Categories/CategoryEditForm";
//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt);
library.add(faEdit);

export default function Categories() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const { currentOrganization, organizationClient } = useCurrentOrganization();

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});

  const [showCategoriesNew, setShowCategoriesNew] = useState(false);
  const [showCategoryEdit, setShowCategoryEdit] = useState(false);
  const handleClose = () => {
    setShowCategoriesNew(false);
    setShowCategoryEdit(false);
  };
  const handleShowCategoriesNew = () => setShowCategoriesNew(true);
  const handleShowEditCategory = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setShowCategoryEdit(true);
  };

  useEffect(() => {
    if (currentOrganization.id) {
      getAllCategories(organizationClient)
        .then((categories) => {
          setCategories(categories);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [currentOrganization.id, organizationClient]);

  const updateCategories = (newCategory) => {
    const newCategories = [...categories, newCategory];
    setCategories(newCategories);
  };

  const handleSubmitEditCategory = ({ newName }, id) => {
    updateCategory(organizationClient, id, {
      name: newName,
      organization_id: currentOrganization.id,
    })
      .then(() => {
        setName(name);
        handleClose();
      })
      .catch((error) => {
        console.error("category update error", error);
      });
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleDeleteCategory = (category) => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(`Are you sure you want to delete the ${category.name} category?`)
    ) {
      deleteCategory(organizationClient, category.id).catch((error) => {
        console.error("category delete error", error);
      });
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div className="flex-container">
      <div className="flex container col">
        <Card className="card-component">
          <Card.Header className="card-component card-heading">
            Categories
          </Card.Header>

          <Button onClick={handleShowCategoriesNew}>Add Category</Button>
        </Card>
      </div>
      <Modal show={showCategoriesNew}>
        <CategoriesNew
          updateCategories={updateCategories}
          onClose={handleClose}
        />
      </Modal>
      <Modal show={showCategoryEdit}>
        <CategoryEditForm
          category={selectedCategory}
          onSubmit={handleSubmitEditCategory}
          onCancel={handleCancel}
        />
      </Modal>
      <CategoriesTable
        categories={categories}
        onShowEditCategory={handleShowEditCategory}
        onDeleteCategory={handleDeleteCategory}
      />
    </div>
  );
}
