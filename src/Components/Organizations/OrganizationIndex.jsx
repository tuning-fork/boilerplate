import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import Container from "../design/Container/Container";
import Button from "../design/Button/Button";
import "./OrganizationIndex.css";

export default function OrganizationIndex() {
  // const { organizations } = useCurrentOrganization();

  const organizations = [
    {
      id: "1",
      name: "Mindy St. Claire Foundation for the Ethics-Impaired",
      users: [{ id: "1", firstName: "Chidi", lastName: "Anagonye" }],
    },
    {
      id: "2",
      name: "Al-Jamil Foundation",
      users: [{ id: "1", firstName: "Chidi", lastName: "Anagonye" }],
    },
    {
      id: "3",
      name: "Save the Shrimp Fund",
      users: [{ id: "1", firstName: "Chidi", lastName: "Anagonye" }],
    },
    {
      id: "4",
      name: "Save the Shrimp Fund",
      users: [{ id: "1", firstName: "Chidi", lastName: "Anagonye" }],
    },
    {
      id: "5",
      name: "Save the Shrimp Fund",
      users: [{ id: "1", firstName: "Chidi", lastName: "Anagonye" }],
    },
    {
      id: "6",
      name: "Save the Shrimp Fund",
      users: [{ id: "1", firstName: "Chidi", lastName: "Anagonye" }],
    },
    {
      id: "7",
      name: "Save the Shrimp Fund",
      users: [{ id: "1", firstName: "Chidi", lastName: "Anagonye" }],
    },
    {
      id: "8",
      name: "Save the Shrimp Fund",
      users: [{ id: "1", firstName: "Chidi", lastName: "Anagonye" }],
    },
    {
      id: "9",
      name: "Save the Shrimp Fund",
      users: [{ id: "1", firstName: "Chidi", lastName: "Anagonye" }],
    },
    {
      id: "10",
      name: "Save the Shrimp Fund",
      users: [{ id: "1", firstName: "Chidi", lastName: "Anagonye" }],
    },
    {
      id: "11",
      name: "Save the Shrimp Fund",
      users: [{ id: "1", firstName: "Chidi", lastName: "Anagonye" }],
    },
  ];
  console.log({ organizations });

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
              <article className="organization-index__organization-card">
                <h2>{organization.name}</h2>
                <ul className="organization-index__user-list">
                  {organization.users &&
                    organization.users.map((user) => (
                      <li>
                        {user.firstName} {user.lastName}
                      </li>
                    ))}
                </ul>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
