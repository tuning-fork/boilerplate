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

  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/funding_orgs/${props.match.params.id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        setId(response.data.id);
        setName(response.data.name);
        setWebsite(response.data.website);
        setOrganizationId(response.data.organization_id);
        setOrganizationName(response.data.organization.name);
        setLoading(false);
        axios
          .get("/api/organizations", {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          })
          .then((response) => {
            setOrganizations(response.data);
            setLoading(false);
            console.log(response.data);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = (event) => {
    axios
      .patch(
        `/api/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/funding_orgs/` +
          id,
        {
          name: name,
          website: website,
          organization_id: organizationId,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        updateOrganizationName(response.data.organization.name);
        toggleHidden();
      })
      .catch((error) => {
        console.log("category update error", error);
      });
    event.preventDefault();
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
            "/organizations/${currentOrganizationStore.currentOrganizationInfo.id}/funding_orgs"
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
                    value={name}
                    name="name"
                    placeholder={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="text"
                    value={website}
                    name="website"
                    placeholder={website}
                    onChange={(event) => setWebsite(event.target.value)}
                    required
                  />
                </Form.Group>
                {/* <Form.Group>
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
                          onChange={(event) =>
                            setOrganizationId(event.target.value)
                          }
                        >
                          {organization.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group> */}
                <div className="text-center">
                  <Button type="submit" className="btn-lg">
                    Submit
                  </Button>
                  <Button onClick={toggleHidden} className="btn-lg">
                    Close
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
