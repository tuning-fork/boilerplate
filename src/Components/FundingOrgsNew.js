import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { createFundingOrg } from "../../Services/Organizations/FundingOrgsService";

export default function FundingOrgsNew(props) {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState([]);
  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationService,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  const clearForm = () => {
    setName("");
    setWebsite("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFundingOrg = {
      name: name,
      website: website,
      organization_id: currentOrganizationId,
    };
    if (currentOrganizationId) {
      createFundingOrg(organizationService, {
        newFundingOrg})
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
