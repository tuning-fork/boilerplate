import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function FundingOrgsOrganizationsNew(props) {
  const [fundingOrgName, setFundingOrgName] = useState("");
  const [website, setWebsite] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [isHiddenNew, setIsHiddenNew] = useState(true);
  const [errors, setErrors] = useState([]);
  const [
    isHiddenFundingOrgsOrganizationsNew,
    setIsHiddenFundingOrgsOrganizationsNew,
  ] = useState(true);

  const handleSubmitOrganization = (event) => {
    event.preventDefault();
    axios
      .post(
        "/api/organizations",
        {
          name: organizationName,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        if (response.data) {
          props.updateOrganizations(response.data);
          props.toggleHiddenFundingOrgsOrganizationsNew();
          clearForm();
        }
      })
      .catch((error) => {
        console.log("organization creation error", error);
      });
  };

  const handleSubmitFundingOrgs = (event) => {
    event.preventDefault();
    axios
      .post(
        "/api/funding_orgs",
        {
          name: fundingOrgName,
          organization_id: organizationId,
          website: website,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        if (response.data) {
          props.updateFundingOrgs(response.data);
          props.toggleHiddenFundingOrgsOrganizationsNew();
          clearForm();
        }
      })
      .catch((error) => {
        console.log("funding org creation error", error);
      });
  };

  const clearForm = () => {
    setFundingOrgName("");
    setWebsite("");
    setOrganizationName("");
    setOrganizationId("");
  };

  return (
    <Card>
      <Card.Body>
        {/* New Organization */}

        <Form onSubmit={handleSubmitOrganization}>
          <Form.Group>
            <Form.Label>New Organization Name</Form.Label>
            <Form.Control
              type="text"
              name="organizationName"
              value={organizationName}
              onChange={(event) => setOrganizationName(event.target.value)}
              required
            />
          </Form.Group>
          <div className="text-center">
            <Button type="submit">Add New Organization</Button>
          </div>
        </Form>
        <br />
        <br />

        {/* New FundingOrg */}

        <Form onSubmit={this.handleSubmitFundingOrgs}>
          <Form.Group>
            <Form.Label>New Funding Org Name</Form.Label>
            <Form.Control
              type="text"
              name="fundingOrgName"
              value={fundingOrgName}
              onChange={(event) => setFundingOrgName(event.target.value)}
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
                    onChange={(event) => setOrganizationId(event.target.value)}
                  >
                    {organization.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <div className="text-center">
            <Button type="submit">Add New Funding Org</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
