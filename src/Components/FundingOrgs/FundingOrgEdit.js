import React from "react";
import { useMutation } from "react-query";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import "./FundingOrgEdit.css";
import * as FundingOrgsService from "../../Services/Organizations/FundingOrgsService";
import FundingOrgForm from "./FundingOrgForm";
import Modal from "../design/Modal/Modal";

export default function FundingOrgEdit(props) {
  const { organizationClient } = useCurrentOrganization();

  // const handleSubmit = (fundingOrgFields) => {
  //   FundingOrgsService.updateFundingOrg(
  //     organizationClient,
  //     props.fundingOrg.id,
  //     {
  //       ...fundingOrgFields,
  //       organizationId: organizationClient,
  //     }
  //   )
  //     .then((fundingOrg) => {
  //       if (fundingOrg.id) {
  //         props.onClose();
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("funding org update error", error);
  //     });
  // };

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

  const handleDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete this funding org?`)) {
      FundingOrgsService.updateFundingOrg(
        organizationClient,
        props.fundingOrg.id,
        {
          archived: true,
        }
      )
        .then(() => {
          alert("Funding org deleted!");
          props.onClose();
        })
        .catch((error) => {
          console.error(error);
          alert(
            "Eek! Something went wrong when deleting the funding org. Try again soon."
          );
        });
    }
    // eslint-disable-next-line no-restricted-globals
    // if (confirm(`Are you sure you want to delete this funding org?`)) {
    //   FundingOrgsService.deleteFundingOrg(
    //     organizationClient,
    //     props.fundingOrg.id
    //   )
    //     .then(() => {
    //       alert("Funding org deleted!");
    //       props.onClose();
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       alert(
    //         "Eek! Something went wrong when deleting the funding org. Try again soon."
    //       );
    //     });
    // }
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
          onDelete={handleDelete}
        />
      </Modal>
    </div>
  );
}
