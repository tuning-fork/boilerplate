import React, { useState, useMemo, useContext } from "react";
import { useQuery, useMutation } from "react-query";
import {
  MdRestartAlt,
  MdRemoveCircle,
  MdPersonRemove,
  MdError,
  MdCached,
} from "react-icons/md";
import clsx from "clsx";
import formatDate from "../../Helpers/formatDate";
import * as OrganizationService from "../../Services/OrganizationService";
import * as InvitationsService from "../../Services/Organizations/InvitationsService";
import { CurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import Button from "../../Components/design/Button/Button";
import Modal from "../../Components/design/Modal/Modal";
import Table from "../../Components/design/Table/Table";
import TextBox from "../../Components/design/TextBox/TextBox";
import Popover from "../../Components/design/Popover/Popover";
import InviteUserForm from "./InviteUserForm/InviteUserForm";
import "./UserIndexPage.css";

const Tabs = {
  USERS: "USERS",
  INVITATIONS: "INVITATIONS",
};

export default function UserIndexPage() {
  const [tabSelect, setTabSelect] = useState(Tabs.USERS);
  const { organizationClient } = useContext(CurrentOrganizationContext);
  const [searchString, setSearchString] = useState("");
  const [showingInviteUser, setShowingInviteUser] = useState(false);

  const { data: users } = useQuery("getUsers", () =>
    OrganizationService.getAllOrganizationUsers(organizationClient)
  );
  const { data: invitations } = useQuery("getInvitations", () =>
    InvitationsService.getAllInvitations(organizationClient)
  );

  const { mutate: deleteOrganizationUser } = useMutation(
    (userId) =>
      OrganizationService.deleteOrganizationUser(organizationClient, userId),
    {
      onSuccess: () => {
        alert("User removed from organization!");
      },
    }
  );
  const { mutate: createInvitation } = useMutation(
    (invitationFields) =>
      InvitationsService.createInvitation(organizationClient, invitationFields),
    {
      onSuccess: () => {
        alert("Invitation created!");
        setShowingInviteUser(false);
      },
    }
  );
  const { mutate: reinvite } = useMutation(
    (invitationId) =>
      InvitationsService.reinvite(organizationClient, invitationId),
    {
      onSuccess: () => {
        alert("Invitation resent!");
      },
    }
  );
  const { mutate: deleteInvitation } = useMutation(
    (invitationId) =>
      InvitationsService.deleteInvitation(organizationClient, invitationId),
    {
      onSuccess: () => {
        alert("Invitation deleted!");
      },
    }
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

  const columns =
    tabSelect === Tabs.INVITATIONS
      ? [
          {
            Header: "First Name",
            accessor: (invitation) => (
              <>
                <div
                  className={clsx(
                    "user-index-row-status",
                    invitation.hasExpired() && "user-index-row-status--expired"
                  )}
                >
                  {invitation.hasExpired() ? (
                    <Popover text="Invitation expired" direction="left">
                      <MdError />
                    </Popover>
                  ) : (
                    <Popover text="Invitation pending" direction="left">
                      <MdCached />
                    </Popover>
                  )}
                </div>
                {invitation.firstName}
              </>
            ),
          },
          { Header: "Last Name", accessor: "lastName" },
          { Header: "Email", accessor: "email" },
          {
            Header: "Sent At",
            accessor: (invitation) => (
              <>
                {formatDate(invitation.updatedAt)}
                <div className="user-index__row-actions">
                  <Popover text="Resend invitation" direction="right">
                    <Button
                      onClick={() => reinvite(invitation.id)}
                      variant="none"
                    >
                      <MdRestartAlt />
                    </Button>
                  </Popover>
                  <Popover text="Remove invitation" direction="right">
                    <Button
                      onClick={() =>
                        // eslint-disable-next-line no-restricted-globals
                        confirm(
                          "Are you sure you want to uninvite this user?"
                        ) && deleteInvitation(invitation.id)
                      }
                      variant="none"
                    >
                      <MdRemoveCircle />
                    </Button>
                  </Popover>
                </div>
              </>
            ),
          },
        ]
      : [
          { Header: "First Name", accessor: "firstName" },
          { Header: "Last Name", accessor: "lastName" },
          {
            Header: "Email",
            accessor: (user) => (
              <>
                {user.email}
                <div className="user-index__row-actions">
                  <Popover text="Remove user" direction="right">
                    <Button
                      onClick={() =>
                        // eslint-disable-next-line no-restricted-globals
                        confirm("Are you sure you want to remove this user?") &&
                        deleteOrganizationUser(user.id)
                      }
                      variant="none"
                    >
                      <MdPersonRemove />
                    </Button>
                  </Popover>
                </div>
              </>
            ),
          },
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
        <Button onClick={() => setShowingInviteUser(true)}>Invite User</Button>
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
      <Modal show={showingInviteUser} heading="Invite User">
        <InviteUserForm
          onSubmit={createInvitation}
          onCancel={() => setShowingInviteUser(false)}
        />
      </Modal>
    </section>
  );
}
