import React, { useEffect, useMemo, useState } from "react";
import { MdAccessTime, MdAlarm } from "react-icons/md";
import { differenceInDays } from "date-fns";
import { useCurrentUserContext } from "../Contexts/currentUserContext";
import { useCurrentOrganizationContext } from "../Contexts/currentOrganizationContext";
import { getAllUsers } from "../Services/Organizations/OrganizationUsersService";
import { getAllGrants } from "../Services/Organizations/GrantsService";
import Button from "./design/Button/Button";
import CurrentOrganizationLink from "./Helpers/CurrentOrganizationLink";
import GrantListItem from "./Dashboard/GrantListItem";
import UserListItem from "./Dashboard/UserListItem";
import "./Dashboard.css";

// Includes dates starting from today to 6 days in the past
const isRecent = (date) => {
  const diff = differenceInDays(new Date(), date);
  return diff >= 0 && diff <= 6;
};

// Includes dates starting from today to 6 days into the future
const isSoon = (date) => {
  const diff = differenceInDays(new Date(), date);
  return diff <= 0 && diff >= -6;
};

export default function Dashboard() {
  const { currentUserStore } = useCurrentUserContext();
  const { organizationClient } = useCurrentOrganizationContext();

  const [users, setUsers] = useState([]);
  const [grants, setGrants] = useState([]);
  const recentDrafts = useMemo(
    () => grants.filter((grant) => isRecent(grant.updatedAt)),
    [grants]
  );
  const dueSoon = useMemo(
    () => grants.filter((grant) => isSoon(grant.deadline)),
    [grants]
  );

  useEffect(() => {
    if (organizationClient) {
      getAllUsers(organizationClient).then(setUsers);
      getAllGrants(organizationClient).then(setGrants);
    }
  }, [organizationClient]);

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
              key={recentDraftGrant.id}
              grant={recentDraftGrant}
              icon={MdAccessTime}
            />
          ))}
          {!recentDrafts.length && <p>No recent grant drafts.</p>}
        </ul>
      </article>

      <article className="dashboard__due-soon">
        <h2 className="heading-4">Due Soon</h2>
        <ul className="dashboard__due-soon-list">
          {dueSoon.map((dueSoonGrant) => (
            <GrantListItem
              key={dueSoonGrant.id}
              grant={dueSoonGrant}
              icon={MdAlarm}
            />
          ))}
          {!recentDrafts.length && <p>No grants due soon.</p>}
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
            <UserListItem key={user.id} user={user} />
          ))}
        </ul>
      </article>
    </section>
  );
}
