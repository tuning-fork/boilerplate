import React, { useMemo } from "react";
import { MdAccessTime, MdAlarm } from "react-icons/md";
import { useCurrentUser } from "../Contexts/currentUserContext";
import isRecent from "../Helpers/date/isRecent";
import isSoon from "../Helpers/date/isSoon";
import Button from "./design/Button/Button";
import CurrentOrganizationLink from "./Helpers/CurrentOrganizationLink";
import { Grant, OrganizationUser } from "../resources";
import GrantListItem from "./Dashboard/GrantListItem";
import UserListItem from "./Dashboard/UserListItem";
import "./Dashboard.css";
import useOrganizationResource from "../Hooks/useOrganizationResource";

/**
 * const organization = useOrganization()
 * const organizations = useOrganizations()
 * const { updateOrganization, createOrganization, deleteOrganization } = useMutateOrganization()
 *
 * const grantSections = useGrantSections()
 * const grantSection = useGrantSection()
 * const {
 *   updateGrantSection,
 *   createGrantSection,
 *   deleteGrantSection,
 *   reorderGrantSection, # new
 * } = useMutateGrantSection()
 *
 * hooks/resources/grantHooks.js
 *
 * function useResource(params) {
 *   GET '/api/organizations/{context.currentOrganizationId}/{params.resource}/${params.id}'
 * }
 */

export default function Dashboard() {
  const { user } = useCurrentUser();

  const users = useOrganizationResource(OrganizationUser.list());
  const grants = useOrganizationResource(Grant.list());

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
