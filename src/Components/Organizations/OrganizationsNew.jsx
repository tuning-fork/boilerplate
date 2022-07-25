import React from "react";
import { withNavbarLayout } from "../Layouts/NavbarLayout/NavbarLayout";
import OrganizationForm from "./OrganizationForm";

function OrganizationsNew() {
  const handleSubmit = async (organization) => {};

  return (
    <section>
      <h1>Add Organization</h1>
      <OrganizationForm onSubmit={handleSubmit} onCancel={() => {}} />
    </section>
  );
}

export default withNavbarLayout(OrganizationsNew);
