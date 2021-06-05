import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { format as formatDate, parse as parseDate } from "date-fns";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import { getGrant } from "../../Services/Organizations/GrantsService";
import "./GrantEdit.css";

function formatDateForInput(date) {
  return formatDate(date, "yyyy-MM-dd'T'hh:mm");
}
function parseDateFromInput(dateString) {
  return parseDate(dateString, "yyyy-MM-dd'T'hh:mm", new Date());
}

export default function GrantEdit(props) {
  const [newGrantFields, setNewGrantFields] = useState({
    deadline: null,
    fundingOrganization: null,
    purpose: "",
    rfpUrl: "",
    title: "",
  });

  const { organizationClient } = useCurrentOrganizationContext();
  const { grant_id: grantId } = useParams();

  const handleDelete = () => {};
  const handleChangeField = (field) => (event) => {
    event.preventDefault();

    const newValue =
      field === "deadline"
        ? parseDateFromInput(event.target.value)
        : event.target.value;

    setNewGrantFields((fields) => ({
      ...fields,
      [field]: newValue,
    }));
  };
  const handleCancel = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (!organizationClient) {
      return;
    }

    getGrant(organizationClient, grantId).then((grant) => {
      setNewGrantFields({
        deadline: new Date(grant.deadline),
        fundingOrg: grant.funding_org,
        purpose: grant.purpose,
        rfpUrl: grant.rfp_url,
        title: grant.title,
      });
    });
  }, [grantId, organizationClient]);

  return (
    <Container className="GrantEdit" as="section">
      <header className="GrantEdit__Header">
        <h1>Edit Grant</h1>
        <Button variant="outline-dark" onClick={handleDelete}>
          Delete Grant
        </Button>
      </header>

      <Form onSubmit={handleSubmit}>
        <div className="GrantEdit__Inputs">
          <Form.Group>
            <Form.Label>Funding Organization</Form.Label>
            <Form.Control
              as="select"
              value={newGrantFields.fundingOrg?.id}
              onChange={handleChangeField("fundingOrganization")}
              required
            >
              <option value={newGrantFields.fundingOrg?.id}>
                {newGrantFields.fundingOrg?.name}
              </option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={newGrantFields.title}
              onChange={handleChangeField("title")}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>RFP URL</Form.Label>
            <Form.Control
              type="url"
              value={newGrantFields.rfpUrl}
              onChange={handleChangeField("rfpUrl")}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="datetime-local"
              value={
                newGrantFields.deadline
                  ? formatDateForInput(newGrantFields.deadline)
                  : ""
              }
              onChange={handleChangeField("deadline")}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Purpose</Form.Label>
            <Form.Control
              type="text"
              value={newGrantFields.purpose}
              onChange={handleChangeField("purpose")}
              required
            />
          </Form.Group>
        </div>
        <div className="GrantEdit__Actions">
          <Button variant="outline-dark" size="lg" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="dark" size="lg" type="submit" onClick={handleSubmit}>
            Finish
          </Button>
        </div>
      </Form>
    </Container>
  );
}
