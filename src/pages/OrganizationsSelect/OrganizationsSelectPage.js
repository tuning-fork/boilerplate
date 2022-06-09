import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "contexts/currentUserContext";
import { useCurrentOrganization } from "contexts/currentOrganizationContext";
import Container from "components/design/Container/Container";
import Dropdown from "components/design/Dropdown/Dropdown";
import Button from "components/design/Button/Button";

export default function OrganizationsSelectPage() {
  const { user } = useCurrentUser();
  const { organizations } = useCurrentOrganization();
  const [currentOrganizationId, setCurrentOrganizationId] = useState();

  return (
    <Container as="section" className="org-select">
      <h1>Welcome, {user.firstName}</h1>
      <p>
        Please select an organization to continue to your organization
        dashboard:
      </p>
      <form>
        <Dropdown
          onChange={(option) => setCurrentOrganizationId(option.value)}
          labelText="Organization"
          placeholder="Select Organization"
          value={currentOrganizationId}
          options={organizations.map((organization) => ({
            value: organization.id,
            label: organization.name,
          }))}
          required
        />
        {currentOrganizationId && (
          <Button
            as={Link}
            to={`/organizations/${currentOrganizationId}/dashboard`}
          >
            Go to Dashboard
          </Button>
        )}
      </form>
    </Container>
  );
}
