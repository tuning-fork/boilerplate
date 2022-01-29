import React, { useState, useEffect, useMemo, useCallback } from "react";
import clsx from "clsx";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import Table from "../design/Table/Table";
import CategoryNew from "./CategoryNew";
import CategoryEdit from "./CategoryEdit";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import {
  getAllCategories,
  updateCategory,
} from "../../Services/Organizations/CategoriesService";
import formatDate from "../../Helpers/formatDate";
import DropdownMini from "../design/DropdownMini/DropdownMini";
import "./CategoriesIndex.css";

export default function CategoriesIndex() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [tabSelect, setTabSelect] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState({});
  const [showingCategoryNew, setShowingCategoryNew] = useState(false);
  const [showingCategoryEdit, setShowingCategoryEdit] = useState(false);
  const { organizationClient } = useCurrentOrganization();

  const [searchFilters, setSearchFilters] = useState({
    title: "",
  });

  const openEditCategory = (category) => {
    setShowingCategoryEdit(true);
    setSelectedCategory(category);
  };

  const fetchCategories = useCallback(async () => {
    if (!organizationClient) {
      return;
    }

    try {
      const categories = await getAllCategories(organizationClient);
      setCategories(categories);
    } catch (error) {
      setErrors([error]);
    } finally {
      setLoading(false);
    }
  }, [organizationClient]);

  const handleDropdownMiniAction = async ({ option, category }) => {
    try {
      switch (option.value) {
        case "REMOVE_FROM_ARCHIVED":
          await updateCategory(organizationClient, category.id, {
            archived: false,
          });
          break;
        case "MARK_AS_ARCHIVED":
          await updateCategory(organizationClient, category.id, {
            archived: true,
          });
          break;
        case "EDIT":
          openEditCategory(category);
          break;
        default:
          throw new Error(`Unexpected option given ${option.value}!`);
      }
      await fetchCategories();
    } catch (error) {
      console.error(error);
      setErrors([error]);
    }
  };

  const handleCloseCategoryModal = () => {
    setShowingCategoryNew(false);
    setShowingCategoryEdit(false);
    return fetchCategories();
  };

  const columns = [
    { Header: "Name", accessor: "name" },
    {
      Header: "Date Created",
      accessor: (category) => formatDate(category.created_at),
    },
    {
      Header: "Last Modified",
      accessor: (category) => (
        <div className="categories-index__last-modified-cell">
          {formatDate(category.updated_at)}
          <DropdownMini
            className="categories-index__see-more"
            labelText="Further Actions"
            placeholder="Pick One"
            options={[
              category.archived
                ? {
                    value: "REMOVE_FROM_ARCHIVED",
                    label: "Remove from Archive",
                  }
                : { value: "MARK_AS_ARCHIVED", label: "Archive" },
              { value: "EDIT", label: "Edit" },
            ]}
            onChange={(option) =>
              handleDropdownMiniAction({ option, category })
            }
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filteredCategories = useMemo(() => {
    return categories
      .filter((category) => {
        const matchesTitle = category.name
          .toLowerCase()
          .includes(searchFilters.title.toLowerCase());
        return matchesTitle;
      })
      .filter((category) => {
        if (tabSelect === "All") {
          return category;
        } else if (tabSelect === "Archived") {
          return category.archived === true;
        }
        return category;
      });
  }, [categories, searchFilters, tabSelect]);

  if (errors.length) {
    console.error(errors);
    return <p>Error! {errors.map((error) => error.message)}</p>;
  } else if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <section className="categories-index">
      <h1 className="categories-index__header-text">All Categories</h1>
      <div className="categories-index__actions">
        <TextBox
          labelText="Search Categories by Title"
          search
          onChange={(event) =>
            setSearchFilters({ ...searchFilters, title: event.target.value })
          }
          className="categories-index__search-input"
        />
        <Button onClick={() => setShowingCategoryNew(true)}>
          Add New Category
        </Button>
      </div>
      <div className="categories-index__table-tabs">
        <Button
          onClick={() => setTabSelect("All")}
          className={clsx(
            "categories-index__table-tab-button",
            tabSelect === "All" &&
              "categories-index__table-tab-button--selected"
          )}
          variant="text"
        >
          All
        </Button>
        <Button
          onClick={() => setTabSelect("Archived")}
          className={clsx(
            "categories-index__table-tab-button",
            tabSelect === "Archived" &&
              "categories-index__table-tab-button--selected"
          )}
          variant="text"
        >
          Archived
        </Button>
      </div>
      <div className="categories-index__table">
        {filteredCategories.length ? (
          <Table columns={columns} data={filteredCategories} />
        ) : (
          <p>There are no categories for this category.</p>
        )}
      </div>
      <CategoryNew
        show={showingCategoryNew}
        onClose={() => handleCloseCategoryModal()}
      />
      <CategoryEdit
        category={selectedCategory}
        show={showingCategoryEdit}
        onClose={() => handleCloseCategoryModal()}
      />
    </section>
  );
}
