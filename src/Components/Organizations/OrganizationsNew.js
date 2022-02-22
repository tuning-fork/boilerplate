import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function OrganizationsNew(props) {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.onSubmit({
      name: name,
    });
    setName("");
  };

  return (
    <Card>
      <Card.Header>
        <h3>Add Organization</h3>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Organization Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Form.Group>
          <Button variant="outline-dark" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button variant="dark" type="submit">
            Add New Organization
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
