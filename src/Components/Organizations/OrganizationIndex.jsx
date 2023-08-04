import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Container, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCurrentUser } from "../../Contexts/currentUserContext";
import useCreateOrganization from "../../Hooks/useCreateOrganization";
import OrganizationCard from "./OrganizationIndex/OrganizationCard";
import OrganizationForm from "./OrganizationForm";
import Background from "../design/Background/Background";
import { withNavbarLayout } from "../Layouts/NavbarLayout/NavbarLayout";
import "./OrganizationIndex.css";

function OrganizationIndex() {
  const { organizations } = useCurrentUser();
  const history = useHistory();
  const [
    newOrgModalOpened,
    { open: openNewOrgModal, close: closeNewOrgModal },
  ] = useDisclosure(false);
  const createOrganization = useCreateOrganization({
    onSuccess: closeNewOrgModal,
  });

  useEffect(() => {
    if (organizations.length === 0) {
      history.push("/organizations/new");
    }
  }, [history, organizations]);

  return (
    <Background>
      <Container component="section" size="xl" className="organization-index">
        <header className="organization-index__header">
          <h1>Organizations</h1>
          <Button onClick={openNewOrgModal}>Add New Organization</Button>
        </header>
        <ul className="organization-index__list">
          {organizations.map((organization) => (
            <li
              data-testid={organization.name}
              key={organization.id}
              className="organization-index__list-item"
            >
              <Link to={`/organizations/${organization.id}/dashboard`}>
                <OrganizationCard organization={organization} />
              </Link>
            </li>
          ))}
        </ul>
        <Modal
          opened={newOrgModalOpened}
          title="Add Organization"
          size="md"
          centered
          onClose={closeNewOrgModal}
        >
          <OrganizationForm
            onSubmit={createOrganization}
            onCancel={closeNewOrgModal}
          />
        </Modal>
      </Container>
    </Background>
  );
}

export default withNavbarLayout(OrganizationIndex);
