import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import FundingOrgsOrganizationsNew from "./FundingOrgsOrganizationsNew";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function GrantsNew(props) {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [rfpUrl, setRfpUrl] = useState("");
  const [deadline, setDeadline] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [successful, setSuccessful] = useState("");
  const [purpose, setPurpose] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [fundingOrgId, setFundingOrgId] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [fundingOrgs, setFundingOrgs] = useState([]);
  const [
    isHiddenFundingOrgsOrganizationsNew,
    setIsHiddenFundingOrgsOrganizationsNew,
  ] = useState("");
  const [errors, setErrors] = useState("");
  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();

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
    axios
      .get(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/funding_orgs`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        setFundingOrgs(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const toggleHiddenFundingOrgsOrganizationsNew = () => {
    setIsHiddenFundingOrgsOrganizationsNew(
      !isHiddenFundingOrgsOrganizationsNew
    );
  };

  const clearForm = () => {
    setTitle("");
    setRfpUrl("");
    setDeadline("");
    setPurpose("");
    setOrganizationId("");
    setFundingOrgId("");
  };

  const updateFundingOrgs = (newFundingOrg) => {
    const newFundingOrgs = [...fundingOrgs];
    newFundingOrgs.push(newFundingOrg);
    setFundingOrgs(newFundingOrgs);
  };

  const updateOrganizations = (newOrganization) => {
    const NewOrganizations = [...organizations];
    NewOrganizations.push(newOrganization);
    setOrganizations(NewOrganizations);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newGrant = {
      title: title,
      rfp_url: rfpUrl,
      deadline: deadline,
      submitted: submitted,
      successful: successful,
      purpose: purpose,
      organization_id: currentOrganizationStore.currentOrganizationInfo.id,
      funding_org_id: fundingOrgId,
    };
    axios
      .post(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/grants`,
        newGrant,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        if (response.data) {
          props.updateGrants(response.data);
          clearForm();
        }
      })
      .catch((error) => {
        console.log("grant creation error", error);
      });
  };

  return (
    <Card>
      {!isHiddenFundingOrgsOrganizationsNew ? (
        <FundingOrgsOrganizationsNew
          organizations={organizations}
          funding_orgs={fundingOrgs}
          updateOrganizations={updateOrganizations}
          updateFundingOrgs={updateFundingOrgs}
          toggleHiddenFundingOrgsOrganizationsNew={
            toggleHiddenFundingOrgsOrganizationsNew
          }
        />
      ) : null}
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {/* <Form.Group>
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
          </Form.Group> */}
          <Form.Group>
            <Form.Label>Select Funding Organization</Form.Label>
            <Form.Control
              as="select"
              name="fundingOrgId"
              value={fundingOrgId}
              onChange={(event) => setFundingOrgId(event.target.value)}
              required
            >
              <option value="" disabled>
                Select Funding Organization
              </option>
              {fundingOrgs.map((fundingOrg) => {
                return (
                  <option
                    key={fundingOrg.id}
                    value={fundingOrg.id}
                    onChange={(event) => setFundingOrgId(event.target.value)}
                  >
                    {fundingOrg.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Button
            variant="secondary"
            size="sm"
            onClick={toggleHiddenFundingOrgsOrganizationsNew}
          >
            Add New Funding Organization and/or Organization
          </Button>
          <br />
          <br />
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>RFP URL</Form.Label>
            <Form.Control
              name="rfpUrl"
              value={rfpUrl}
              onChange={(event) => setRfpUrl(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="datetime-local"
              name="deadline"
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Purpose</Form.Label>
            <Form.Control
              name="purpose"
              value={purpose}
              onChange={(event) => setPurpose(event.target.value)}
              required
            />
          </Form.Group>
          <div className="text-center">
            <Button type="submit">Add New Grant</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
