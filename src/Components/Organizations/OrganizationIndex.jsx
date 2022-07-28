import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../Contexts/currentUserContext";
import useCreateOrganization from "../../Hooks/useCreateOrganization";
import OrganizationCard from "./OrganizationIndex/OrganizationCard";
import OrganizationForm from "./OrganizationForm";
import Container from "../design/Container/Container";
import Button from "../design/Button/Button";
import Modal from "../design/Modal/Modal";
import Background from "../design/Background/Background";
import { withNavbarLayout } from "../Layouts/NavbarLayout/NavbarLayout";
import "./OrganizationIndex.css";

function OrganizationIndex() {
  const { organizations } = useCurrentUser();
  const [isNewOrganizationModalOpen, setIsNewOrganizationModalOpen] =
    useState(false);

  const createOrganization = useCreateOrganization({
    onSuccess: () => setIsNewOrganizationModalOpen(false),
  });

  return (
    <Background>
      <Container as="section" className="organization-index">
        <header className="organization-index__header">
          <h1>Organizations</h1>
          <Button
            className="organization-index__new-button"
            onClick={() => setIsNewOrganizationModalOpen(true)}
          >
            Add New Organization
          </Button>
        </header>
        <ul className="organization-index__list">
          {organizations.map((organization) => (
            <li key={organization.id} className="organization-index__list-item">
              <Link to={`/organizations/${organization.id}/dashboard`}>
                <OrganizationCard organization={organization} />
              </Link>
            </li>
          ))}
        </ul>
        <Modal show={isNewOrganizationModalOpen} heading="Add Organization">
          <OrganizationForm
            onSubmit={createOrganization}
            onCancel={() => setIsNewOrganizationModalOpen(false)}
          />
        </Modal>
      </Container>
    </Background>
  );
}

export default withNavbarLayout(OrganizationIndex);
