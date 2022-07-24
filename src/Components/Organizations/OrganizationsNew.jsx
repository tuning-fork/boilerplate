import React from "react";
import OrganizationForm from "./OrganizationForm";

export default function OrganizationsNew() {
  const handleSubmit = async (organization) => {};

  return (
    <section>
      <h1>Add Organization</h1>
      <OrganizationForm onSubmit={handleSubmit} onCancel={() => {}} />
    </section>
  );
}
