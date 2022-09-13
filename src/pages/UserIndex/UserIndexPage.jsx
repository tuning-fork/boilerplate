import React, { useState, useMemo, useContext } from "react";
import { useQuery } from "react-query";
import * as OrganizationService from "../../Services/OrganizationService";
import { CurrentOrganizationContext } from "../../Contexts/currentOrganizationContext";
import Table from "../../Components/design/Table/Table";
import TextBox from "../../Components/design/TextBox/TextBox";
import "./UserIndexPage.css";

export default function UserIndexPage() {
  const { organizationClient } = useContext(CurrentOrganizationContext);
  const [searchString, setSearchString] = useState("");
  const { data: users } = useQuery("getUsers", () =>
    OrganizationService.getAllOrganizationUsers(organizationClient)
  );
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const userFullName = `${user.firstName} ${user.lastName}`;
      return userFullName
        .toLowerCase()
        .includes(searchString.toLowerCase().trim());
    });
  }, [users, searchString]);

  const columns = [
    { Header: "First Name", accessor: "firstName" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "Email", accessor: "email" },
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
      {filteredUsers.length ? (
        <Table
          className="user-index__table"
          columns={columns}
          data={filteredUsers}
        />
      ) : (
        <p>No users found.</p>
      )}
    </section>
  );
}
