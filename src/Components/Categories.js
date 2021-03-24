import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoriesNew from "./CategoriesNew";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/Card";

export default function Categories() {
  console.log("categories rerendering");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [query] = useState("");

  useEffect(() => {
    console.log("categories mounted");
    console.log("local storage token", localStorage.token);
    axios
      .get("/api/categories", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        console.log("categories data fetched", response.data);
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
    axios
      .get("/api/organizations", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        console.log("organizations data fetched", response.data);
        setOrganizations(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const updateCategories = (newCategory) => {
    const newCategories = [...categories];
    categories.push(newCategory);
    setCategories(newCategories);
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
          {categories.map((category) => {
            return (
              <Link to={`/categories/${category.id}`}>{category.name}</Link>
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
