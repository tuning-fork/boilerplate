import React, { useState, useMemo, useContext } from "react";
import { useQuery } from "react-query";
import clsx from "clsx";
import * as OrganizationService from "../../Services/OrganizationService";
import * as InvitationsService from "../../Services/Organizations/InvitationsService";
import { CurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import Button from "../../Components/design/Button/Button";
import Table from "../../Components/design/Table/Table";
import TextBox from "../../Components/design/TextBox/TextBox";
import "./UserIndexPage.css";

const Tabs = {
  USERS: "USERS",
  INVITATIONS: "INVITATIONS",
};

export default function UserIndexPage() {
  const [tabSelect, setTabSelect] = useState(Tabs.USERS);
  const { organizationClient } = useContext(CurrentOrganizationContext);
  const [searchString, setSearchString] = useState("");
  const { data: users } = useQuery("getUsers", () =>
    OrganizationService.getAllOrganizationUsers(organizationClient)
  );
  const { data: invitations } = useQuery("getInvitations", () =>
    InvitationsService.getAllInvitations(organizationClient)
  );
  const resources = useMemo(() => {
    if (tabSelect === Tabs.USERS) {
      return users;
    } else if (tabSelect === Tabs.INVITATIONS) {
      return invitations;
    }
  }, [tabSelect, users, invitations]);
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const resourceFullName = `${resource.firstName} ${resource.lastName}`;
      return resourceFullName
        .toLowerCase()
        .includes(searchString.toLowerCase().trim());
    });
  }, [resources, searchString]);

  const columns = [
    { Header: "First Name", accessor: "firstName" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "Email", accessor: "email" },
    // TODO: if tab is invitations, add column for "Sent At" that uses invitation.updatedAt
  ];

  return (
    <section className="user-index">
      <h1>All Users</h1>
      <div className="user-index__actions">
        <TextBox
          labelText="Search Users by Name"
          search
          onChange={(event) => setSearchString(event.target.value)}
          className="user-index__search-input"
        />
      </div>
      <div className="user-index__table-tabs">
        <Button
          onClick={() => setTabSelect(Tabs.USERS)}
          className={clsx(
            "user-index__table-tab-button",
            tabSelect === Tabs.USERS && "user-index__table-tab-button--selected"
          )}
          variant="text"
        >
          Users
        </Button>
        <Button
          onClick={() => setTabSelect(Tabs.INVITATIONS)}
          className={clsx(
            "user-index__table-tab-button",
            tabSelect === Tabs.INVITATIONS &&
              "user-index__table-tab-button--selected"
          )}
          variant="text"
        >
          Invitations
        </Button>
      </div>
      {filteredResources.length ? (
        <Table
          className="user-index__table"
          columns={columns}
          data={filteredResources}
        />
      ) : (
        <p>No {tabSelect === Tabs.USERS ? "users" : "invitations"} found.</p>
      )}
    </section>
  );
}
