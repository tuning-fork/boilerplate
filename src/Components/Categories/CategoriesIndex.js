import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import Table from "../design/Table/Table";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import { getAllCategories } from "../../Services/Organizations/CategoriesService";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import "./CategoriesIndex.css";

export default function CategoriesIndex() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const history = useHistory();

  const [searchFilters, setSearchFilters] = useState({
    name: "",
  });

  const openCategoryShow = (row) => {
    history.push(buildOrganizationsLink(`/categories/${row.original.id}`));
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

  const columns = [{ Header: "Category Name", accessor: "name" }];

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesName = category.name
        .toLowerCase()
        .includes(searchFilters.name.toLowerCase());
      return matchesName;
    });
  }, [categories, searchFilters]);

  if (errors.length) {
    console.error(errors);
    return <p>Error! {errors.map((error) => error.message)}</p>;
  } else if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <section className="categories-index">
      <h1>All Categories</h1>
      <div className="categories-index__actions">
        <TextBox
          labelText="Search Categories by Title"
          search
          onChange={(event) =>
            setSearchFilters({ ...searchFilters, text: event.target.value })
          }
          className="categories-index__search-input"
        />
        <Button
          as={Link}
          to={`/organizations/${currentOrganization.id}/categories-new/`}
        >
          Add New Category
        </Button>
      </div>
      <Table
        columns={columns}
        data={filteredCategories}
        onRowClick={openCategoryShow}
      />
    </section>
  );
}
