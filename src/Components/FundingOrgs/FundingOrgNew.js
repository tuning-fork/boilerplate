import React from "react";
import { useMutation } from "react-query";
import Modal from "../design/Modal/Modal";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import * as FundingOrgsService from "../../Services/Organizations/FundingOrgsService";
import FundingOrgForm from "./FundingOrgForm";
import "./FundingOrgNew.css";

export default function FundingOrgNew(props) {
  const { organizationClient } = useCurrentOrganization();

  // const handleSubmit = (fundingOrgFields) => {
  //   createFundingOrg(organizationClient, {
  //     ...fundingOrgFields,
  //     organizationId: currentOrganization.id,
  //   })
  //     .then((fundingOrg) => {
  //       if (fundingOrg.id) {
  //         props.onClose(fundingOrg.id);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("funding org creation error", error);
  //     });
  // };

  const { mutate: createFundingOrg } = useMutation(
    (fundingOrgFields) =>
      FundingOrgsService.createFundingOrg(organizationClient, fundingOrgFields),
    {
      onSuccess: () => {
        alert("Funding Org created!");
        props.onClose();
      },
    }
  );

  function handleCreateFundingOrg(newFundingOrgFields) {
    createFundingOrg({
      name: newFundingOrgFields.name,
      website: newFundingOrgFields.website,
    });
  }

  const handleCancel = () => {
    props.onClose();
  };

  return (
    <Modal
      show={props.show}
      heading="Add New Funding Org"
      className="fundingorg-new"
    >
      <FundingOrgForm
        onSubmit={handleCreateFundingOrg}
        onCancel={handleCancel}
      />
    </Modal>
  );
}
