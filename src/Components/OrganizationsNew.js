import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function OrganizationsNew(props) {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const [newOrganization, setNewOrganization] = useState("");

  const clearForm = () => {
    setName("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const newOrganization = this.state;
    axios
      .post("/api/organizations", newOrganization, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        if (response.data) {
          props.toggleHiddenOrganizationsNew();
          props.updateOrganizations(response.data);
          clearForm();
        }
      })
      .catch((error) => {
        console.log("organization creation error", error);
      });
  };

  return (
    <Card>
      <Card.Header>
        <h3>Add An Organization</h3>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>New Organization Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Form.Group>
          <div className="text-center">
            <Button type="submit">Add New Organization</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
