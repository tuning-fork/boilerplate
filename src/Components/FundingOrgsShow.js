import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "./Elements/Modal";
import { useHistory } from "react-router-dom";
import {
  getFundingOrg,
  updateFundingOrg,
  deleteFundingOrg,
} from "../Services/Organizations/FundingOrgsService";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import FundingOrgEditForm from "./FundingOrgs/FundingOrgEditForm";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateGrant } from "../Services/Organizations/GrantsService";

library.add(faTrashAlt);
library.add(faEdit);

export default function FundingOrgsShow(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationService,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;

  const [newName, setNewName] = useState("");
  const [newWebsite, setNewWebsite] = useState("");

  const history = useHistory();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    confundingOrgId = props.match.params.funding_org_id;
    if (currentOrganizationId) {
      getFundingOrg(organizationService, fundingOrgId)
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
    updateFundingOrg(organizationService, id, {
      name: newName,
      website: newWebsite,
      organization_id: organizationId,
    })
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
  };

  const handleCancel = (event) => {
    handleClose();
  };

  const handleFundingOrgDelete = () => {
    if (currentOrganizationId) {
      getFundingOrg(organizationService, fundingOrgId)
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

  const Header = (
    <Card.Header style={{ backgroundColor: "#09191b" }}>
      <h3
        style={{
          color: "#23cb87",
          fontWeight: "bolder",
          display: "inline",
        }}
      >
        Name: {name}
      </h3>
      <FontAwesomeIcon
        icon={faEdit}
        style={{
          color: "#fefefe",
          fontSize: "1.5rem",
          marginLeft: "160px",
        }}
        onClick={handleShow}
      />
      <FontAwesomeIcon
        icon={faTrashAlt}
        style={{
          color: "#fefefe",
          fontSize: "1.5rem",
          marginLeft: "10px",
        }}
        onClick={handleFundingOrgDelete}
      />
    </Card.Header>
  );

  return (
    <div className="container">
      <Card>
        {Header}
        <Card.Body>
          <h3>Website: {website}</h3>
          <h3>Organization Name: {organizationName}</h3>
        </Card.Body>
      </Card>
      <br />
      <div className="container">
        <Modal show={show} onClose={handleClose}>
          <Card>
            <Card.Body>
              <FundingOrgEditForm
                name={name}
                website={website}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </Card.Body>
          </Card>
        </Modal>
      </div>
    </div>
  );
}
