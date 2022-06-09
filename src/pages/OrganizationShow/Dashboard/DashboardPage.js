import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { MdAccessTime, MdAlarm } from "react-icons/md";
import isRecent from "lib/date/isRecent";
import isSoon from "lib/date/isSoon";
import { getAllGrants } from "services/p0/Organizations/GrantsService";
import { getAllOrganizationUsers } from "services/p0/OrganizationService";
import { useCurrentUser } from "contexts/currentUserContext";
import { useCurrentOrganization } from "contexts/currentOrganizationContext";
import Button from "components/design/Button/Button";
import CurrentOrganizationLink from "components/CurrentOrganizationLink";
import GrantListItem from "./GrantListItem";
import UserListItem from "./UserListItem";
import "./DashboardPage.css";

export default function DashboardPage() {
  const { user } = useCurrentUser();
  const { organizationClient } = useCurrentOrganization();
  const { data: grants } = useQuery("getAllGrants", () =>
    getAllGrants(organizationClient)
  );
  const { data: users } = useQuery("getAllOrganizationUsers", () =>
    getAllOrganizationUsers(organizationClient)
  );

  const recentDrafts = useMemo(
    () => grants.filter((grant) => isRecent(grant.updatedAt)),
    [grants]
  );
  const dueSoon = useMemo(
    () => grants.filter((grant) => isSoon(grant.deadline)),
    [grants]
  );

  return (
    <section className="dashboard">
      <header className="dashboard__header">
        <h1>Welcome, {user.firstName}!</h1>
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
          {!dueSoon.length && <p>No grants due soon.</p>}
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
