import React from "react";
import { Organization } from "../../resources";
import { useFetcher } from "rest-hooks";
import "./OrganizationEdit.css";
import OrganizationForm from "./OrganizationForm";
import Modal from "../design/Modal/Modal";

export default function OrganizationEdit(props) {
  const updateOrganization = useFetcher(Organization.update());

  const handleSubmit = (organizationFields) => {
    updateOrganization(
      { id: organizationFields.id },
      { name: organizationFields.name }
    )
      .then((organization) => {
        if (organization.id) {
          props.onClose();
        }
      })
      .catch((error) => {
        console.error("organization update error", error);
      });
  };

  const handleCancel = () => {
    props.onClose();
  };

  return (
    <div className="organization-edit">
      <Modal
        show={props.show}
        heading="Edit Organization"
        className="organization-edit"
      >
        <OrganizationForm
          organization={props.organization}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}
