import React from "react";
import Modal from "../design/Modal/Modal";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import { createFundingOrg } from "../../Services/Organizations/FundingOrgsService";
import FundingOrgForm from "./FundingOrgForm";
import "./FundingOrgNew.css";

export default function FundingOrgNew(props) {
  const { currentOrganization, organizationClient } = useCurrentOrganization();

  const handleSubmit = (fundingOrgFields) => {
    createFundingOrg(organizationClient, {
      ...fundingOrgFields,
      organizationId: currentOrganization.id,
    })
      .then((fundingOrg) => {
        if (fundingOrg.id) {
          props.onClose(fundingOrg.id);
        }
      })
      .catch((error) => {
        console.error("funding org creation error", error);
      });
  };

  const handleCancel = () => {
    props.onClose();
  };

  return (
    <Modal
      show={props.show}
      heading="Add New Funding Org"
      className="fundingorg-new"
    >
      <FundingOrgForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </Modal>
  );
}
