import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../Contexts/currentUserContext";
import { useCurrentOrganization } from "../Contexts/currentOrganizationContext";
import Container from "./design/Container/Container";
import Dropdown from "./design/Dropdown/Dropdown";
import Button from "./design/Button/Button";

export default function OrgSelect() {
  const { user } = useCurrentUser();
  const { organizations } = useCurrentOrganization();
  const [selectedOrganizationId, setSelectedOrganizationId] = useState();

  return (
    <Container as="section" className="org-select">
      <h1>Welcome, {user.first_name}</h1>
      <p>
        Please select an organization to continue to your organization
        dashboard:
      </p>
      <form>
        <Dropdown
          onChange={(option) => setSelectedOrganizationId(option.value)}
          labelText="Organization"
          placeholder="Select Organization"
          value={selectedOrganizationId}
          options={organizations.map((organization) => ({
            value: organization.id,
            label: organization.name,
          }))}
          required
        />
        {selectedOrganizationId && (
          <Button
            as={Link}
            to={`/organizations/${selectedOrganizationId}/dashboard`}
          >
            Go to organization
          </Button>
        )}
      </form>
    </Container>
  );
}
