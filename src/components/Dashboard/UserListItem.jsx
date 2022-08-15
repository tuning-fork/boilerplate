import React from "react";
import CurrentOrganizationLink from "../helpers/CurrentOrganizationLink";
import Avatar from "../design/Avatar/Avatar";
import "./UserListItem.css";

export default function UserListItem(props) {
  const { user } = props;

  return (
    <li className="user-list-item">
      <CurrentOrganizationLink to={`/users/${user.id}`}>
        <Avatar>
          {user.firstName} {user.lastName}
        </Avatar>
        {user.firstName} {user.lastName}
      </CurrentOrganizationLink>
    </li>
  );
}
