import React from "react";
import { useMutation } from "react-query";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import "./FundingOrgEdit.css";
import * as FundingOrgsService from "../../Services/Organizations/FundingOrgsService";
import FundingOrgForm from "./FundingOrgForm";
import Modal from "../design/Modal/Modal";

export default function FundingOrgEdit(props) {
  const { organizationClient } = useCurrentOrganization();

  const { mutate: updateFundingOrg } = useMutation(
    (newFundingOrgFields) =>
      FundingOrgsService.updateFundingOrg(
        organizationClient,
        newFundingOrgFields.id,
        newFundingOrgFields
      ),
    {
      onSuccess: () => {
        alert("Funding Org edited!");
        props.onClose();
      },
    }
  );

  const handleEditFundingOrg = (newFundingOrgFields) => {
    updateFundingOrg({
      ...newFundingOrgFields,
      name: newFundingOrgFields.name,
      website: newFundingOrgFields.website,
    });
  };

  const handleCancel = () => {
    props.onClose();
  };

  return (
    <div className="fundingorg-edit">
      <Modal
        show={props.show}
        heading="Edit Funding Org"
        className="fundingorg-edit"
      >
        <FundingOrgForm
          fundingOrg={props.fundingOrg}
          onSubmit={handleEditFundingOrg}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}
