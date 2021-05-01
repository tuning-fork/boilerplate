import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import FundingOrgEditForm from "./FundingOrgs/FundingOrgEditForm";

export default function FundingOrgsShow(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [organizationId, setOrganizationId] = useState("");
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

  const [newName, setNewName] = useState("");
  const [newWebsite, setNewWebsite] = useState("");

  const history = useHistory();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (currentOrganizationId) {
      axios
        .get(
          `/api/organizations/${currentOrganizationId}/funding_orgs/${props.match.params.funding_org_id}`,
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
          setNewName(response.data.name);
          setNewWebsite(response.data.website);
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

  const handleSubmit = ({ newName, newWebsite }) => {
    axios
      .patch(
        `/api/organizations/${currentOrganizationId}/funding_orgs/` + id,
        {
          name: newName,
          website: newWebsite,
          organization_id: organizationId,
        },
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      )
      .then((response) => {
        handleClose();
        updateOrganizationName(response.data.organization.name);
        setNewName(response.data.name);
        setNewWebsite(response.data.website);
        toggleHidden();
      })
      .catch((error) => {
        console.log("category update error", error);
      });
    event.preventDefault();
  };

  const handleCancel = (event) => {
    handleClose();
  };

  const handleFundingOrgDelete = () => {
    axios
      .delete(
        `/api/organizations/${currentOrganizationId}/funding_orgs/` + id,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      )
      .then((response) => {
        if (response.data.message) {
          history.push(`/organizations/${currentOrganizationId}/funding_orgs`);
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
        <Button onClick={toggleHidden}>Update Funding Org</Button>
        <Button variant="danger" onClick={handleFundingOrgDelete}>
          Delete Funding Org
        </Button>
        <br />
        <br />
        {!isHidden ? (
          <div className="card">
            <div className="card-body">
              <FundingOrgEditForm
                name={name}
                website={website}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
