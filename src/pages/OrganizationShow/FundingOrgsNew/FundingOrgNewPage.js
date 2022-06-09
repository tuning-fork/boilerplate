import React from "react";
import Modal from "../../../components/design/Modal/Modal";
import { useCurrentOrganization } from "../../../contexts/currentOrganizationContext";
import { createFundingOrg } from "../../../services/p0/Organizations/FundingOrgsService";
import FundingOrgForm from "./FundingOrgForm";
import "./FundingOrgNewPage.css";

export default function FundingOrgNewPage(props) {
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
