import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import Container from "../design/Container/Container";
import Button from "../design/Button/Button";
import OrganizationCard from "./OrganizationIndex/OrganizationCard";
import "./OrganizationIndex.css";

export default function OrganizationIndex() {
  const { organizations } = useCurrentOrganization();

  return (
    <Container as="section" className="organization-index">
      <header className="organization-index__header">
        <h1>Organizations</h1>
        <Button className="organization-index__new-button">
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
    </Container>
  );
}
