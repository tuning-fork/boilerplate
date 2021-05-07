import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoriesNew from "./CategoriesNew";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { getAllCategories } from "../Services/Organizations/CategoriesService";

export default function Categories() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [query] = useState("");
  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationClient,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  useEffect(() => {
    if (currentOrganizationId) {
      getAllCategories(organizationClient)
        .then((response) => {
          setCategories(response.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [currentOrganizationId]);

  const updateCategories = (newCategory) => {
    const newCategories = [...categories];
    newCategories.push(newCategory);
    setCategories(newCategories);
  };

  useEffect(() => {}, [categories]);

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
          {categories.map((category) => {
            return (
              <Link
                to={`/organizations/${currentOrganizationId}/categories/${category.id}`}
              >
                {category.name}
              </Link>
            );
          })}
        </Card>
      </div>
      <div className="flex container col">
        <CategoriesNew updateCategories={updateCategories} />
      </div>
    </div>
  );
}
