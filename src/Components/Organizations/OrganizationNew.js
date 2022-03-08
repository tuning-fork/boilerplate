import React from "react";
import Modal from "../design/Modal/Modal";
import { Organization } from "../../resources";
import { useFetcher } from "rest-hooks";
import OrganizationForm from "./OrganizationForm";
import "./OrganizationNew.css";

export default function OrganizationNew(props) {
  const createOrganization = useFetcher(Organization.create());

  const handleSubmit = (organizationFields) => {
    createOrganization({
      ...organizationFields,
    })
      .then((organization) => {
        if (organization.id) {
          props.onClose();
        }
      })
      .catch((error) => {
        console.error("organization creation error", error);
      });
  };

  const handleCancel = () => {
    props.onClose();
  };

  return (
    <Modal
      show={props.show}
      heading="Add New Organization"
      className="organization-new"
    >
      <OrganizationForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </Modal>
  );
}
