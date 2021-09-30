import React, { useState } from "react";
import Button from "../design/Button/Button";
import TextBox from "../design/TextBox/TextBox";
import Modal from "../design/Modal/Modal";
import { useCurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import { createFundingOrg } from "../../Services/Organizations/FundingOrgsService";
import "./FundingOrgsNew.css";

export default function FundingOrgsNew(props) {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const { currentOrganizationStore, organizationClient } =
    useCurrentOrganizationContext();
  const currentOrganizationId =
    currentOrganizationStore.currentOrganization?.id;

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFundingOrg = {
      name: name,
      website: website,
      organization_id: currentOrganizationId,
    };
    if (currentOrganizationId) {
      createFundingOrg(organizationClient, newFundingOrg)
        .then((fundingOrg) => {
          props.onClose(fundingOrg.id);
        })
        .catch((error) => {
          console.log("funding org creation error", error);
        });
    }
  };

  return (
    <Modal
      show={props.show}
      heading="Add New Funding Organization"
      className="funding-orgs-new"
    >
      <form onSubmit={handleSubmit}>
        <TextBox
          labelText="Name"
          onChange={(event) => setName(event.target.value)}
        />
        <TextBox
          labelText="Website"
          onChange={(event) => setWebsite(event.target.value)}
        />
        <div className="funding-orgs-new__button-group">
          <Button variant="outlined" onClick={props.onClose}>
            Cancel
          </Button>
          <Button type="submit">Save New Funding Org</Button>
        </div>
      </form>
    </Modal>
  );
}
