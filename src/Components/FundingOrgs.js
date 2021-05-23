import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FundingOrgsNew from "./FundingOrgsNew";
import Modal from "./Elements/Modal";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { getAllFundingOrgs } from "../Services/Organizations/FundingOrgsService";
import FundingOrgEditForm from "./FundingOrgs/FundingOrgEditForm";
import {
  getFundingOrg,
  updateFundingOrg,
  deleteFundingOrg,
} from "../Services/Organizations/FundingOrgsService";

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faTrashAlt);
library.add(faEdit);

export default function FundingOrgs() {
  const [loading, setLoading] = useState(true);
  const [fundingOrgs, setFundingOrgs] = useState([]);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [newName, setNewName] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [selectedFundingOrg, setSelectedFundingOrg] = useState({});
  const {
    currentOrganizationStore,
    currentOrganizationDispatch,
    organizationClient,
  } = useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization &&
    currentOrganizationStore.currentOrganization.id;
  const [showFundingOrgsNew, setShowFundingOrgsNew] = useState(false);
  const [showFundingOrgEdit, setShowFundingOrgEdit] = useState(false);
  const handleClose = () => {
    setShowFundingOrgsNew(false);
    setShowFundingOrgEdit(false);
  };
  const handleShowFundingOrgsNew = () => setShowFundingOrgsNew(true);
  const handleShowFundingOrgEdit = (selectedFundingOrg) => {
    setSelectedFundingOrg(selectedFundingOrg);
    setShowFundingOrgEdit(true);
  };

  useEffect(() => {
    if (currentOrganizationId) {
      getAllFundingOrgs(organizationClient)
        .then((fundingOrgs) => {
          setFundingOrgs(fundingOrgs);
          setLoading(false);
          console.log(fundingOrgs);
        })
        .catch((error) => console.log(error));
    }
    window.scrollTo(0, 0);
  }, [loading, currentOrganizationId]);

  const updateFundingOrgs = (newFundingOrg) => {
    const newFundingOrgs = [...fundingOrgs, newFundingOrg];
    setFundingOrgs(newFundingOrgs);
  };

  const handleSubmitFundingOrgEdit = ({ newName, newWebsite }, id) => {
    updateFundingOrg(organizationClient, id, {
      name: newName,
      website: newWebsite,
      organization_id: currentOrganizationId,
    })
      .then((fundingOrg) => {
        setName(name);
        setWebsite(website);
        handleClose();
      })
      .catch((error) => {
        console.log("funding org update error", error);
      });
  };

  const handleCancel = (event) => {
    handleClose();
  };

  const handleFundingOrgDelete = (fundingOrgId) => {
    console.log("deleted!");
  };

  if (loading === true) {
    return (
      <div className="container">
        <h1>Loading....</h1>
      </div>
    );
  } else {
    return (
      <div className="flex-container">
        <div className="flex container col">
          <Card className="card-component">
            <Card.Header className="card-component card-heading">
              Funding Orgs
            </Card.Header>
            <Button onClick={handleShowFundingOrgsNew}>
              <Button>Add Funding Org</Button>
            </Button>
            {fundingOrgs.map((fundingOrg) => {
              return (
                <div>
                  <p>Funding Org Name: {fundingOrg.name}</p>
                  <p>Funding Org Website: {fundingOrg.website}</p>
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{
                      color: "black",
                      fontSize: "1.5rem",
                    }}
                    onClick={() => handleShowFundingOrgEdit(fundingOrg)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    style={{
                      color: "black",
                      fontSize: "1.5rem",
                    }}
                    onClick={() => handleFundingOrgDelete(fundingOrg.id)}
                  />
                </div>
              );
            })}
          </Card>
        </div>
        <Modal show={showFundingOrgsNew} onClose={handleClose}>
          <FundingOrgsNew updateFundingOrgs={updateFundingOrgs} />
        </Modal>
        <Modal show={showFundingOrgEdit} onClose={handleClose}>
          <FundingOrgEditForm
            fundingOrg={selectedFundingOrg}
            onSubmit={handleSubmitFundingOrgEdit}
            onCancel={handleCancel}
          />
        </Modal>
      </div>
    );
  }
}
