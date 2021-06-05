import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { format as formatDate, parse as parseDate } from "date-fns";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import {
  deleteGrant,
  getGrant,
  updateGrant,
} from "../../Services/Organizations/GrantsService";
import useBuildOrganizationsLink from "../../Hooks/useBuildOrganizationsLink";
import "./GrantEdit.css";

function formatDateForInput(date) {
  return formatDate(date, "yyyy-MM-dd'T'HH:mm");
}
function parseDateFromInput(dateString) {
  return parseDate(dateString, "yyyy-MM-dd'T'HH:mm", new Date());
}

export default function GrantEdit(props) {
  const [newGrantFields, setNewGrantFields] = useState({
    deadline: null,
    fundingOrganization: null,
    purpose: "",
    rfp_url: "",
    title: "",
  });
  const { organizationClient } = useCurrentOrganizationContext();
  const buildOrganizationsLink = useBuildOrganizationsLink();
  const { grant_id: grantId } = useParams();
  const history = useHistory();

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete this grant?`)) {
      deleteGrant(organizationClient, grantId)
        .then(() => {
          alert("Grant deleted!");
          history.push(buildOrganizationsLink("/grants"));
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Eek! Something went wrong when deleting the grant. Try again soon."
          );
        });
    }
  };

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
    updateGrant(organizationClient, grantId, newGrantFields)
      .then((updatedGrant) => {
        setNewGrantFields({
          deadline: new Date(updatedGrant.deadline),
          fundingOrg: updatedGrant.funding_org,
          purpose: updatedGrant.purpose,
          rfp_url: updatedGrant.rfp_url,
          title: updatedGrant.title,
        });
        alert("Grant updated!");
      })
      .catch((error) => {
        console.error(error);
        alert(
          "Eek! Something went wrong when updating the grant. Try again soon."
        );
      });
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
        rfp_url: grant.rfp_url,
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
              value={newGrantFields.rfp_url}
              onChange={handleChangeField("rfp_url")}
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
