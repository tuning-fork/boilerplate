import React, { useState, useEffect } from "react";
import axios from "axios";
import FundingOrgsNew from "./FundingOrgsNew";
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
  const [fundingOrgs, setFundingOrgs] = useState([]);
  const [isHiddenFundingOrgsNew, setIsHiddenFundingOrgsNew] = useState("");
  const [errors, setErrors] = useState("");
  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  useEffect(() => {
    if (currentOrganizationId) {
      axios
        .get(`/api/organizations/${currentOrganizationId}/funding_orgs`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          setFundingOrgs(response.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [currentOrganizationId]);

  const toggleHiddenFundingOrgsNew = () => {
    setIsHiddenFundingOrgsNew(!isHiddenFundingOrgsNew);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const newGrant = {
      title: title,
      rfp_url: rfpUrl,
      deadline: deadline,
      submitted: submitted,
      successful: successful,
      purpose: purpose,
      organization_id: currentOrganizationStore.currentOrganization.id,
      funding_org_id: fundingOrgId,
    };
    axios
      .post(`/api/organizations/${currentOrganizationId}/grants`, newGrant, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
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
      {!isHiddenFundingOrgsNew ? (
        <FundingOrgsNew
          funding_orgs={fundingOrgs}
          updateFundingOrgs={updateFundingOrgs}
          toggleHiddenFundingOrgsNew={toggleHiddenFundingOrgsNew}
        />
      ) : null}
      <Card.Body>
        <Form onSubmit={handleSubmit}>
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
            onClick={toggleHiddenFundingOrgsNew}
          >
            Add New Funding Organization
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
