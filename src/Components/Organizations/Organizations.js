import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetcher, useResource } from "rest-hooks";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Organization } from "../../resources";
import OrganizationsNew from "./OrganizationsNew";
import OrganizationEditForm from "./OrganizationEditForm";
import Modal from "../Elements/Modal";
import "./Organizations.css";

export default function Organizations() {
  const [showingNewOrganizationModal, setShowingNewOrganizationModal] =
    useState(false);
  const [showingEditOrganizationModal, setShowingEditOrganizationModal] =
    useState(false);
  const [editingOrganizationId, setEditingOrganizationId] = useState(null);
  const organizations = useResource(Organization.list(), {});
  const createOrganization = useFetcher(Organization.create());
  const updateOrganization = useFetcher(Organization.update());
  const deleteOrganization = useFetcher(Organization.delete());

  const openAddNewOrganizationModal = () =>
    setShowingNewOrganizationModal(true);
  const closeAddNewOrganizationModal = () =>
    setShowingNewOrganizationModal(false);

  const handleAddNewOrganization = (fields) =>
    createOrganization(fields, fields).then(closeAddNewOrganizationModal);

  const openEditOrganizationModal = () => setShowingEditOrganizationModal(true);
  const closeEditOrganizationModal = () =>
    setShowingEditOrganizationModal(false);

  const handleClickEditOrganization = (organizationId) => {
    setEditingOrganizationId(organizationId);
    openEditOrganizationModal();
  };

  const handleEditOrganization = ({ newName }) =>
    updateOrganization({ id: editingOrganizationId }, { name: newName })
      .then(() => closeEditOrganizationModal())
      .catch((error) => console.error(error));

  const handleDeleteOrganization = (id) => {
    /* eslint-disable-next-line no-restricted-globals */
    if (confirm("Are you sure you want to delete this organization?")) {
      deleteOrganization({ id })
        .catch((error) => console.error(error))
        .finally(() => {});
    }
  };

  return (
    <Container className="Organizations">
      <Row>
        <Col md={8}>
          <h1>Organizations</h1>
          <b>Organization Name</b>
          <ul className="Organizations__List">
            {organizations.map((organization) => (
              <li key={organization.id}>
                <Link to={`/organizations/${organization.id}`}>
                  {organization.name}
                </Link>
                <Button
                  variant="outline-dark"
                  onClick={() => handleDeleteOrganization(organization.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline-dark"
                  onClick={() => handleClickEditOrganization(organization.id)}
                >
                  Edit
                </Button>
              </li>
            ))}
          </ul>
        </Col>
        <Col>
          <Button variant="dark" onClick={openAddNewOrganizationModal}>
            Add New Organization
          </Button>
        </Col>
      </Row>

      <Modal show={showingNewOrganizationModal}>
        <OrganizationsNew
          onSubmit={handleAddNewOrganization}
          onCancel={closeAddNewOrganizationModal}
        />
      </Modal>

      <Modal show={showingEditOrganizationModal}>
        <OrganizationEditForm
          onSubmit={handleEditOrganization}
          onCancel={closeEditOrganizationModal}
        />
      </Modal>
    </Container>
  );
}
