import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../Contexts/currentUserContext";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import Container from "../design/Container/Container";
import Dropdown from "../design/Dropdown/Dropdown";
import Button from "../design/Button/Button";

export default function OrgSelect() {
  const { user } = useCurrentUser();
  const { organizations } = useCurrentOrganization();
  const [currentOrganizationUuid, setCurrentOrganizationUuid] = useState();

  return (
    <Container as="section" className="org-select">
      <h1>Welcome, {user.firstName}</h1>
      <p>
        Please select an organization to continue to your organization
        dashboard:
      </p>
      <form>
        <Dropdown
          onChange={(option) => setCurrentOrganizationUuid(option.value)}
          labelText="Organization"
          placeholder="Select Organization"
          value={currentOrganizationUuid}
          options={organizations.map((organization) => ({
            value: organization.uuid,
            label: organization.name,
          }))}
          required
        />
        {currentOrganizationUuid && (
          <Button
            as={Link}
            to={`/organizations/${currentOrganizationUuid}/dashboard`}
          >
            Go to Dashboard
          </Button>
        )}
      </form>
    </Container>
  );
}
