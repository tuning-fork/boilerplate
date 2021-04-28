import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function CategoriesOrganizationsNew(props) {
  const [categoryName, setCategoryName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [isHiddenNew, setIsHiddenNew] = useState(true);
  const [errors, setErrors] = useState([]);
  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();

  const clearForm = () => {
    setCategoryName("");
    setOrganizationName("");
    setOrganizationId("");
  };

  const handleSubmitCategory = (event) => {
    event.preventDefault();
    axios
      .post(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/categories`,
        {
          name: categoryName,
          organization_id: organizationId,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        if (response.data) {
          props.updateCategories(response.data);
          clearForm();
          props.toggleHiddenCategoriesOrganizationsNew();
        }
      })
      .catch((error) => {
        console.log("category creation error", error);
      });
  };

  return (
    <div className="container">
      <Card>
        <Card.Header>
          <h3>Add Category</h3>
        </Card.Header>
        <Card.Body>
          {/* New Category */}

          <Form onSubmit={handleSubmitCategory}>
            <Form.Group>
              <Form.Label>New Category Name</Form.Label>
              <Form.Control
                type="text"
                name="categoryName"
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
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
                {props.organizations.map((organization) => {
                  return (
                    <option
                      key={organization.id}
                      value={organization.id}
                      onChange={(event) =>
                        setOrganizationId(event.target.value)
                      }
                    >
                      {organization.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <div className="text-center">
              <Button type="submit">Add New Category</Button>
            </div>
          </Form>
          <br />
          <br />
        </Card.Body>
      </Card>
      <br />
    </div>
  );
}
