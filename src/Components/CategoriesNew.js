import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCurrentOrganization } from "../Contexts/currentOrganizationContext";
import { createCategory } from "../Services/Organizations/CategoriesService";

export default function CategoriesNew(props) {
  const [name, setName] = useState("");
  const { onClose } = props;
  const { currentOrganization, organizationClient } = useCurrentOrganization();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCategory = {
      name: name,
      organization_id: currentOrganization.id,
    };
    if (currentOrganization.id) {
      createCategory(organizationClient, newCategory)
        .then((category) => {
          if (category) {
            props.updateCategories(category);
            clearForm();
            onClose();
          }
        })
        .catch((error) => {
          console.error("category creation error", error);
        });
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    onClose();
  };

  const clearForm = () => {
    setName("");
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
          <div>
            <Button
              type="submit"
              style={{
                maxWidth: "50%",
                align: "center",
              }}
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Button
              style={{
                maxWidth: "50%",
                align: "center",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
