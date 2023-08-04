import React, { useState, useMemo } from "react";
import { useQuery, useMutation } from "react-query";
import { Button } from "@mantine/core";
import clsx from "clsx";
import TextBox from "../design/TextBox/TextBox";
import Table from "../design/Table/Table";
import DropdownMini from "../design/DropdownMini/DropdownMini";
import CategoryNew from "./CategoryNew";
import CategoryEdit from "./CategoryEdit";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as CategoriesService from "../../Services/Organizations/CategoriesService";
import formatDate from "../../Helpers/formatDate";
import "./CategoriesIndex.css";

export default function CategoriesIndex() {
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

  const {
    data: categories,
    isError,
    isLoading,
    error,
    refetch: refetchCategories,
  } = useQuery("getCategories", () =>
    CategoriesService.getAllCategories(organizationClient)
  );

  const { mutate: updateCategory } = useMutation(
    (categoryFields) =>
      CategoriesService.updateCategory(
        organizationClient,
        categoryFields.id,
        categoryFields
      ),
    {
      onSuccess() {
        refetchCategories();
      },
    }
  );

  const handleDropdownMiniAction = async ({ option, category }) => {
    try {
      switch (option.value) {
        case "REMOVE_FROM_ARCHIVED":
          updateCategory({ id: category.id, archived: false });
          break;
        case "MARK_AS_ARCHIVED":
          updateCategory({ id: category.id, archived: true });
          break;
        case "EDIT":
          openEditCategory(category);
          break;
        default:
          throw new Error(`Unexpected option given ${option.value}!`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { Header: "Name", accessor: "name" },
    {
      Header: "Date Created",
      accessor: (category) => formatDate(category.createdAt),
    },
    {
      Header: "Last Modified",
      accessor: (category) => (
        <div className="categories-index__last-modified-cell">
          {formatDate(category.updatedAt)}
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
          return !category.archived;
        } else if (tabSelect === "Archived") {
          return category.archived;
        }
        return category;
      })
      .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
  }, [categories, searchFilters, tabSelect]);

  const handleCloseCategoryModal = () => {
    setShowingCategoryNew(false);
    setShowingCategoryEdit(false);
    refetchCategories();
    // return categories;
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <section className="categories-index">
      <h1>All Categories</h1>
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
          <p>There are no categories to display in this tab.</p>
        )}
      </div>
      <CategoryNew
        show={showingCategoryNew}
        onClose={handleCloseCategoryModal}
      />
      <CategoryEdit
        category={selectedCategory}
        show={showingCategoryEdit}
        onClose={handleCloseCategoryModal}
      />
    </section>
  );
}
