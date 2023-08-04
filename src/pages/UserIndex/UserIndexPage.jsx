import React, { useState, useMemo, useContext } from "react";
import { useQuery, useMutation } from "react-query";
import {
  MdRestartAlt,
  MdRemoveCircle,
  MdPersonRemove,
  MdError,
  MdCached,
} from "react-icons/md";
import { Tabs, Button, Space, ActionIcon } from "@mantine/core";
import clsx from "clsx";
import formatDate from "../../Helpers/formatDate";
import * as OrganizationService from "../../Services/OrganizationService";
import * as InvitationsService from "../../Services/Organizations/InvitationsService";
import { CurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import Modal from "../../Components/design/Modal/Modal";
import Table from "../../Components/design/Table/Table";
import TextBox from "../../Components/design/TextBox/TextBox";
import Popover from "../../Components/design/Popover/Popover";
import InviteUserForm from "./InviteUserForm/InviteUserForm";
import "./UserIndexPage.css";

export default function UserIndexPage() {
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

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const userFullName = `${user.firstName} ${user.lastName}`;
      return userFullName
        .toLowerCase()
        .includes(searchString.toLowerCase().trim());
    });
  }, [users, searchString]);

  const filteredInvitations = useMemo(() => {
    return invitations.filter((invitation) => {
      const invitationFullName = `${invitation.firstName} ${invitation.lastName}`;
      return invitationFullName
        .toLowerCase()
        .includes(searchString.toLowerCase().trim());
    });
  }, [invitations, searchString]);

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

      <Space h="md" />

      <Tabs defaultValue="users" variant="pills">
        <Tabs.List>
          <Tabs.Tab value="users">Users</Tabs.Tab>
          <Tabs.Tab value="invitations">Invitations</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="users" pt="xs">
          {filteredUsers.length ? (
            <Table
              className="user-index__table"
              columns={[
                { Header: "First Name", accessor: "firstName" },
                { Header: "Last Name", accessor: "lastName" },
                {
                  Header: "Email",
                  accessor: (user) => (
                    <>
                      {user.email}
                      <div className="user-index__row-actions">
                        <Popover text="Remove user" direction="right">
                          <ActionIcon
                            color="dark"
                            size="sm"
                            onClick={() =>
                              // eslint-disable-next-line no-restricted-globals
                              confirm(
                                "Are you sure you want to remove this user?"
                              ) && deleteOrganizationUser(user.id)
                            }
                          >
                            <MdPersonRemove />
                          </ActionIcon>
                        </Popover>
                      </div>
                    </>
                  ),
                },
              ]}
              data={filteredUsers}
            />
          ) : (
            <p>No users found.</p>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="invitations" pt="xs">
          {filteredInvitations.length ? (
            <Table
              className="user-index__table"
              columns={[
                {
                  Header: "First Name",
                  accessor: (invitation) => (
                    <>
                      <div
                        className={clsx(
                          "user-index-row-status",
                          invitation.hasExpired() &&
                            "user-index-row-status--expired"
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
                          <ActionIcon
                            onClick={() => reinvite(invitation.id)}
                            color="dark"
                            size="sm"
                          >
                            <MdRestartAlt />
                          </ActionIcon>
                        </Popover>
                        <Popover text="Remove invitation" direction="right">
                          <ActionIcon
                            color="dark"
                            size="sm"
                            onClick={() =>
                              // eslint-disable-next-line no-restricted-globals
                              confirm(
                                "Are you sure you want to uninvite this user?"
                              ) && deleteInvitation(invitation.id)
                            }
                          >
                            <MdRemoveCircle />
                          </ActionIcon>
                        </Popover>
                      </div>
                    </>
                  ),
                },
              ]}
              data={filteredInvitations}
            />
          ) : (
            <p>No invitations found.</p>
          )}
        </Tabs.Panel>
      </Tabs>

      <Modal show={showingInviteUser} heading="Invite User">
        <InviteUserForm
          onSubmit={createInvitation}
          onCancel={() => setShowingInviteUser(false)}
        />
      </Modal>
    </section>
  );
}
