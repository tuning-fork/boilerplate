import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";

export default function FundingOrgsShow(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [organizations, setOrganizations] = useState([]);
  const [organizationName, setOrganizationName] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [
    currentOrganizationStore,
    currentOrganizationDispatch,
  ] = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganizationInfo &&
    currentOrganizationStore.currentOrganizationInfo.id;

  const [editableName, setEditableName] = useState("");
  const [editableWebsite, setEditableWebsite] = useState("");

  const history = useHistory();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (currentOrganizationId) {
      axios
        .get(`/api/organizations/${currentOrganizationId}`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
        .then((response) => {
          setId(response.data.id);
          setName(response.data.name);
          setWebsite(response.data.website);
          setOrganizationId(response.data.organization_id);
          setOrganizationName(response.data.organization.name);
          setEditableName(response.data.name);
          setEditableWebsite(response.data.website);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentOrganizationId]);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = (event) => {
    axios
      .patch(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/funding_orgs/` +
          id,
        {
          name: editableName,
          website: editableWebsite,
          organization_id: organizationId,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        updateOrganizationName(response.data.organization.name);
        setEditableName(response.data.name);
        setEditableWebsite(response.data.website);
        toggleHidden();
      })
      .catch((error) => {
        console.log("category update error", error);
      });
    event.preventDefault();
  };

  const handleCancel = (event) => {
    setEditableName(name);
    setEditableWebsite(website);
    handleClose();
  };

  const handleFundingOrgDelete = () => {
    axios
      .delete(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/funding_orgs/` +
          id,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        if (response.data.message) {
          history.push(
            `/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/funding_orgs`
          );
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateOrganizationName = (organizationName) => {
    setOrganizationName(organizationName);
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <Card>
        <Card.Header>
          <h3>Name: {name}</h3>
        </Card.Header>
        <Card.Body>
          <h3>Website: {website}</h3>
          <h3>Organization Name: {organizationName}</h3>
        </Card.Body>
      </Card>
      <br />
      <div className="container">
        <Button onClick={toggleHidden}>Update Category</Button>
        <Button variant="danger" onClick={handleFundingOrgDelete}>
          Delete Funding Org
        </Button>
        <br />
        <br />
        {!isHidden ? (
          <div className="card">
            <div className="card-body">
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editableName}
                    name="editableName"
                    placeholder={editableName}
                    onChange={(event) => setEditableName(event.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="text"
                    value={editableWebsite}
                    name="editableWebsite"
                    placeholder={editableWebsite}
                    onChange={(event) => setEditableWebsite(event.target.value)}
                    required
                  />
                </Form.Group>
                <div>
                  <Button
                    variant="outline-success"
                    type="submit"
                    style={{
                      maxWidth: "50%",
                      align: "center",
                      backgroundColor: "#23cb87",
                      color: "#09191b",
                      fontWeight: "bolder",
                    }}
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline-success"
                    style={{
                      maxWidth: "50%",
                      align: "center",
                      backgroundColor: "#23cb87",
                      color: "#09191b",
                      fontWeight: "bolder",
                    }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
