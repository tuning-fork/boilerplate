import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import OrganizationsNew from "./OrganizationsNew";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function FundingOrgsNew(props) {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  // const [organizationId, setOrganizationId] = useState("");
  // const [organizations, setOrganizations] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newFundingOrg, setNewFundingOrg] = useState({});
  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganizationInfo &&
    currentOrganizationStore.currentOrganizationInfo.id;

  const clearForm = () => {
    setName("");
    setWebsite("");
    // setOrganizationId("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFundingOrg = {
      name: name,
      website: website,
      organization_id: currentOrganizationId,
    };
    axios
      .post(
        `/api/organizations/${currentOrganizationId}/funding_orgs`,
        newFundingOrg,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          props.updateFundingOrgs(response.data);
          clearForm();
        }
      })
      .catch((error) => {
        console.log("funding org creation error", error);
      });
  };

  return (
    <Card className="card-dashboard">
      <Card.Header>Add Funding Org</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Funding Organization Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              name="website"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              required
            />
          </Form.Group>
          <div className="text-center">
            <Button type="submit">Add New Funding Org</Button>
          </div>
        </Form>
        <br />
      </Card.Body>
    </Card>
  );
}
