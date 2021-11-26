import React, { useState, useEffect } from "react";
import FundingOrgsNew from "./FundingOrgs/FundingOrgsNew";
import Modal from "./Elements/Modal";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { getAllFundingOrgs } from "../Services/Organizations/FundingOrgsService";
import {
  updateFundingOrg,
  deleteFundingOrg,
} from "../Services/Organizations/FundingOrgsService";
import FundingOrgsTable from "./FundingOrgs/FundingOrgsTable";
import FundingOrgEditForm from "./FundingOrgs/FundingOrgEditForm";
//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt);
library.add(faEdit);

export default function FundingOrgs() {
  const [loading, setLoading] = useState(true);
  const [fundingOrgs, setFundingOrgs] = useState([]);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [selectedFundingOrg, setSelectedFundingOrg] = useState({});
  const { currentOrganizationStore, organizationClient } =
    useCurrentOrganizationContext();
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
  const handleShowEditFundingOrg = (selectedFundingOrg) => {
    setSelectedFundingOrg(selectedFundingOrg);
    setShowFundingOrgEdit(true);
  };

  useEffect(() => {
    if (currentOrganizationId) {
      getAllFundingOrgs(organizationClient)
        .then((fundingOrgs) => {
          setFundingOrgs(fundingOrgs);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
    window.scrollTo(0, 0);
  }, [currentOrganizationId, organizationClient]);

  const updateFundingOrgs = (newFundingOrg) => {
    const newFundingOrgs = [...fundingOrgs, newFundingOrg];
    setFundingOrgs(newFundingOrgs);
  };

  const handleSubmitEditFundingOrg = ({ newName, newWebsite }, id) => {
    updateFundingOrg(organizationClient, id, {
      name: newName,
      website: newWebsite,
      organization_id: currentOrganizationId,
    })
      .then(() => {
        setName(name);
        setWebsite(website);
        handleClose();
      })
      .catch((error) => {
        console.error("funding org update error", error);
      });
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleDeleteFundingOrg = (fundingOrg) => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        `Are you sure you want to delete the ${fundingOrg.name} funding organization?`
      )
    ) {
      deleteFundingOrg(organizationClient, fundingOrg.id).catch((error) => {
        console.error("funding_org delete error", error);
      });
    }
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
              Add New Funding Org
            </Button>
          </Card>
        </div>
        <Modal show={showFundingOrgsNew}>
          <FundingOrgsNew
            updateFundingOrgs={updateFundingOrgs}
            onClose={handleClose}
          />
        </Modal>
        <Modal show={showFundingOrgEdit}>
          <FundingOrgEditForm
            fundingOrg={selectedFundingOrg}
            onSubmit={handleSubmitEditFundingOrg}
            onCancel={handleCancel}
          />
        </Modal>
        <FundingOrgsTable
          funding_orgs={fundingOrgs}
          onShowEditFundingOrg={handleShowEditFundingOrg}
          onDeleteFundingOrg={handleDeleteFundingOrg}
        />
      </div>
    );
  }
}
