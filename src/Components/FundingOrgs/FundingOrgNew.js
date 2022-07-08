import React from "react";
import { useMutation } from "react-query";
import Modal from "../design/Modal/Modal";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as FundingOrgsService from "../../Services/Organizations/FundingOrgsService";
import FundingOrgForm from "./FundingOrgForm";
import "./FundingOrgNew.css";

export default function FundingOrgNew(props) {
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const { mutate: createFundingOrg } = useMutation(
    (newFundingOrgFields) =>
      FundingOrgsService.createFundingOrg(organizationClient, {
        ...newFundingOrgFields,
        organizationUuid: currentOrganization.uuid,
      }),
    {
      onSuccess: (fundingOrg) => {
        alert("Funding org created!");
        props.onClose(fundingOrg.uuid);
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
