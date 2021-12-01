import React from "react";
import CurrentOrganizationLink from "../Helpers/CurrentOrganizationLink";
import UserIcon from "../Helpers/UserIcon";
import "./UserListItem.css";

export default function UserListItem(props) {
  const { user } = props;

  return (
    <li className="user-list-item">
      <CurrentOrganizationLink to={`/users/${user.id}`}>
        <UserIcon firstName={user.first_name} lastName={user.last_name} />
        {user.first_name} {user.last_name}
      </CurrentOrganizationLink>
    </li>
  );
}
