import React from "react";
import { useHistory } from "react-router-dom";
import { withNavbarLayout } from "../Layouts/NavbarLayout/NavbarLayout";
import useCreateOrganization from "../../Hooks/useCreateOrganization";
import Container from "../design/Container/Container";
import OrganizationForm from "./OrganizationForm";
import "./OrganizationNew.css";

function OrganizationNew() {
  const history = useHistory();
  const createOrganization = useCreateOrganization();
  const handleCancel = () => {
    history.push("/organizations");
  };

  return (
    <Container as="section" className="organization-new">
      <h1>Welcome to Boilerplate!</h1>
      <p>
        Now that you've created a user profile, the next step is to create an
        organization. Your user profile will be added automatically.
      </p>
      <OrganizationForm onSubmit={createOrganization} onCancel={handleCancel} />
    </Container>
  );
}

export default withNavbarLayout(OrganizationNew);
