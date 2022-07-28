import React from "react";
import { withNavbarLayout } from "../Layouts/NavbarLayout/NavbarLayout";
import useCreateOrganization from "../../Hooks/useCreateOrganization";
import Container from "../design/Container/Container";
import OrganizationForm from "./OrganizationForm";
import "./OrganizationNew.css";
import { useHistory } from "react-router-dom";

function OrganizationNew() {
  const history = useHistory();
  const createOrganization = useCreateOrganization();
  const handleCancel = () => {
    history.push("/organizations");
  };

  return (
    <Container as="section" className="organization-new">
      <h1>Add Organization</h1>
      <OrganizationForm onSubmit={createOrganization} onCancel={handleCancel} />
    </Container>
  );
}

export default withNavbarLayout(OrganizationNew);
