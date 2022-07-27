import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link, useHistory } from "react-router-dom";
import * as OrganizationService from "../../Services/OrganizationService";
import { useCurrentUser } from "../../Contexts/currentUserContext";
import OrganizationCard from "./OrganizationIndex/OrganizationCard";
import OrganizationForm from "./OrganizationForm";
import Container from "../design/Container/Container";
import Button from "../design/Button/Button";
import Modal from "../design/Modal/Modal";
import Background from "../design/Background/Background";
import { withNavbarLayout } from "../Layouts/NavbarLayout/NavbarLayout";
import "./OrganizationIndex.css";

function OrganizationIndex() {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { authenticatedApiClient, organizations } = useCurrentUser();
  const [isNewOrganizationModalOpen, setIsNewOrganizationModalOpen] =
    useState(false);

  const { mutate: createOrganization } = useMutation(
    (fields) =>
      OrganizationService.createOrganization(authenticatedApiClient, fields),
    {
      onSuccess(organization) {
        setIsNewOrganizationModalOpen(false);
        history.push(`/organizations/${organization.id}`);
        // Refetch user's organizations in current user context
        queryClient.invalidateQueries("organizations");
      },
    }
  );

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
