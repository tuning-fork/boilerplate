import React from "react";
import { MdAccessTime, MdAlarm } from "react-icons/md";
import { useCurrentUserContext } from "../Contexts/currentUserContext";
import Button from "./design/Button/Button";
import CurrentOrganizationLink from "./Helpers/CurrentOrganizationLink";
import GrantListItem from "./Dashboard/GrantListItem";
import UserListItem from "./Dashboard/UserListItem";
import "./Dashboard.css";

export default function Dashboard() {
  const { currentUserStore } = useCurrentUserContext();

  const recentDrafts = [
    { id: 1, title: "Good Place Neighborhood Grant", deadline: new Date() },
  ];
  const dueSoon = [
    {
      id: 2,
      title: "Bad Janet Restorative Justice Initiative Grant ",
      deadline: new Date(),
    },
    {
      id: 3,
      title: "Jason Mendoza Guacamole Grant",
      deadline: new Date(),
    },
    {
      id: 4,
      title: "Party Shrimp Platter Party Grant",
      deadline: new Date(),
    },
    {
      id: 5,
      title: "Cocaine Cannonball Run on Blu-Ray Grant ",
      deadline: new Date(),
    },
    {
      id: 6,
      title: "Derek Derek Derek Derek Derek Derek Derek...",
      deadline: new Date(),
    },
  ];
  const users = [
    { id: 1, first_name: "Chidi", last_name: "Anagonye" },
    { id: 2, first_name: "Tahani", last_name: "Al-Jamil" },
    { id: 3, first_name: "Jason", last_name: "Mendoza" },
    { id: 4, first_name: "Elenor", last_name: "Shellstrop" },
  ];

  return (
    <section className="dashboard">
      <header className="dashboard__header">
        <h1>Welcome, {currentUserStore.currentUser.first_name}!</h1>
        <Button as={CurrentOrganizationLink} to="/grants-new">
          Add New Grant
        </Button>
      </header>

      <article className="dashboard__recent-drafts">
        <h2 className="heading-4">Recent Drafts</h2>
        <ul className="dashboard__recent-drafts-list">
          {recentDrafts.map((recentDraftGrant) => (
            <GrantListItem
              key={recentDraftGrant.id.toString()}
              grant={recentDraftGrant}
              icon={MdAccessTime}
            />
          ))}
        </ul>
      </article>

      <article className="dashboard__due-soon">
        <h2 className="heading-4">Due Soon</h2>
        <ul className="dashboard__due-soon-list">
          {dueSoon.map((dueSoonGrant) => (
            <GrantListItem
              key={dueSoonGrant.id.toString()}
              grant={dueSoonGrant}
              icon={MdAlarm}
            />
          ))}
        </ul>
        <CurrentOrganizationLink
          to="/grants"
          className="dashboard__all-grants-link"
        >
          <b>See all Grants</b>
        </CurrentOrganizationLink>
      </article>

      <article className="dashboard__users">
        <header>
          <h2 className="heading-3">
            <b>Users</b>
          </h2>
          <CurrentOrganizationLink to="/users">
            <b>Manage Users</b>
          </CurrentOrganizationLink>
        </header>
        <ul className="dashboard__users-list">
          {users.map((user) => (
            <UserListItem key={user.id.toString()} user={user} />
          ))}
        </ul>
      </article>
    </section>
  );
}
