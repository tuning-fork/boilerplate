import React from "react";
import CurrentOrganizationLink from "components/CurrentOrganizationLink";
import UserIcon from "components/UserIcon/UserIcon";
import "./UserListItem.css";

export default function UserListItem(props) {
  const { user } = props;

  return (
    <li className="user-list-item">
      <CurrentOrganizationLink to={`/users/${user.id}`}>
        <UserIcon firstName={user.firstName} lastName={user.lastName} />
        {user.firstName} {user.lastName}
      </CurrentOrganizationLink>
    </li>
  );
}
