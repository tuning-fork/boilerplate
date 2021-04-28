import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoriesNew from "./CategoriesNew";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/Card";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function Categories() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  // const [organizations, setOrganizations] = useState([]);
  const [query] = useState("");
  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();

  useEffect(() => {
    axios
      .get(
        `/api/organizations/${currentOrganizationStore.currentOrganization.id}/categories`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
    // axios
    //   .get(
    //     `/api/organizations/${currentOrganizationStore.currentOrganization.id}/organizations`,
    //     {
    //       headers: { Authorization: `Bearer ${localStorage.token}` },
    //     }
    //   )
    //   .then((response) => {
    //     setOrganizations(response.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => console.log(error));
  }, [currentOrganizationStore.currentOrganization.id]);

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
                to={`/organizations/${currentOrganizationStore.currentOrganization.id}/categories/${category.id}`}
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
