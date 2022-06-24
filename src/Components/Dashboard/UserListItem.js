import React from "react";
import CurrentOrganizationLink from "../Helpers/CurrentOrganizationLink";
import UserIcon from "../Helpers/UserIcon";
import "./UserListItem.css";

export default function UserListItem(props) {
  const { user } = props;

  return (
    <li className="user-list-item">
      <CurrentOrganizationLink to={`/users/${user.uuid}`}>
        <UserIcon firstName={user.firstName} lastName={user.lastName} />
        {user.firstName} {user.lastName}
      </CurrentOrganizationLink>
    </li>
  );
}
