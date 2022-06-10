import React from "react";
import { useCurrentOrganization } from "contexts/currentOrganizationContext";
import * as FundingOrgsService from "services/p0/Organizations/FundingOrgsService";
import FundingOrgForm from "components/forms/FundingOrgForm/FundingOrgForm";
import Modal from "components/design/Modal/Modal";
import "./FundingOrgEdit.css";

export default function FundingOrgEdit(props) {
  const { organizationClient } = useCurrentOrganization();

  const handleSubmit = (fundingOrgFields) => {
    FundingOrgsService.updateFundingOrg(
      organizationClient,
      props.fundingOrg.id,
      {
        ...fundingOrgFields,
        organizationId: organizationClient,
      }
    )
      .then((fundingOrg) => {
        if (fundingOrg.id) {
          props.onClose();
        }
      })
      .catch((error) => {
        console.error("funding org update error", error);
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
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      </Modal>
    </div>
  );
}
