import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import OrganizationsNew from "./OrganizationsNew";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function CategoriesNew(props) {
  const [name, setName] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({});
  const [isHiddenNew, setIsHiddenNew] = useState(true);

  const clearForm = () => {
    setName("");
    setOrganizationId("");
  };

  useEffect(() => {
    axios
      .get("/api/organizations", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        setOrganizations(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/categories", newCategory, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        if (response.data) {
          props.updateCategories(response.data);
          clearForm();
        }
      })
      .catch((error) => {
        console.log("category creation error", error);
      });
  };

  const updateOrganizations = (newOrganization) => {
    const newOrganizations = [...organizations];
    newOrganizations.push(newOrganization);
    setOrganizations(organizations);
  };

  const toggleHiddenNew = () => {
    setIsHiddenNew(!isHiddenNew);
  };

  return (
    <Card className="card-dashboard">
      <Card.Header>Add Category</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Organization</Form.Label>
            <Form.Control
              as="select"
              name="organizationId"
              value={organizationId}
              onChange={(event) => setOrganizationId(event.target.value)}
              required
            >
              <option value="" disabled>
                Select Organization
              </option>
              {organizations.map((organization) => {
                return (
                  <option
                    key={organization.id}
                    value={organization.id}
                    onChange={(event) => setOrganizationId(event.target.value)}
                  >
                    {organization.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <div className="text-center">
            <Button
              variant="outline-success"
              type="submit"
              style={{
                maxWidth: "25%",
                align: "center",
                backgroundColor: "#23cb87",
                color: "#09191b",
                fontWeight: "bolder",
              }}
            >
              Save Category
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
