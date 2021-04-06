import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function OrganizationUser(props) {
  const [userId, setUserId] = useState(localStorage.user_id);
  const [organizationId, setOrganizationId] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [organizationUsers, setOrganizationUsers] = useState([]);
  const [organization, setOrganization] = useState("");

  useEffect(() => {
    axios
      .get("/api/organizations", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      // {withCredentials: true})
      .then((response) => {
        setOrganizations(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const clearForm = () => {
    setOrganizationId("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newOrganizationUser = {
      organization_id: organizationId,
      user_id: userId,
    };
    axios
      .post("/api/organization_users", newOrganizationUser, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
      .then((response) => {
        if (response.data) {
          props.updateOrganizationUsers(response.data);
          clearForm();
        }
      })
      .catch((error) => {
        console.log("organization user creation error", error);
      });
  };

  return (
    <Card>
      Here are your current organizations:
      {organizationUsers.map((organizationUser) => {
        return (
          <div key={organizationUser.organization_id}>
            <h4>{organizationUser.organization_name}</h4>
          </div>
        );
      })}
      <br />
      <OrganizationUser
        updateOrganizationUsers={props.updateOrganizationUsers}
      />
      <Card.Header>
        <h3>Add Your Organizations</h3>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Select An Organization</Form.Label>
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
                    onChange={(event) => setOrganization(event.target.value)}
                  >
                    {organization.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <div className="text-center">
            <Button type="submit">Add New Organization User</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
