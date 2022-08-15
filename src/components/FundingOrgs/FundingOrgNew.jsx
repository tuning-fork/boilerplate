import React from "react";
import { useMutation } from "react-query";
import Modal from "../design/Modal/Modal";
import { useCurrentOrganization } from "../../contexts/currentOrganizationContext";
import * as FundingOrgsService from "../../services/Organizations/FundingOrgsService";
import FundingOrgForm from "./FundingOrgForm";
import "./FundingOrgNew.css";

export default function FundingOrgNew(props) {
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const { mutate: createFundingOrg } = useMutation(
    (newFundingOrgFields) =>
      FundingOrgsService.createFundingOrg(organizationClient, {
        ...newFundingOrgFields,
        organizationId: currentOrganization.id,
      }),
    {
      onSuccess: (fundingOrg) => {
        alert("Funding org created!");
        props.onClose(fundingOrg.id);
      },
    }
  );

  const handleCancel = () => {
    props.onClose();
  };

  return (
    <Modal
      show={props.show}
      heading="Add New Funding Org"
      className="fundingorg-new"
    >
      <FundingOrgForm onSubmit={createFundingOrg} onCancel={handleCancel} />
    </Modal>
  );
}
