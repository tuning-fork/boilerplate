import React from "react";
import formatDate from "../../Helpers/formatDate";
import CurrentOrganizationLink from "../Helpers/CurrentOrganizationLink";
import "./GrantListItem.css";

export default function GrantListItem(props) {
  const { grant } = props;

  return (
    <li className="grant-list-item">
      <CurrentOrganizationLink to={`/grants/${grant.uuid}`}>
        <article className="grant">
          <p className="grant__title">{grant.title}</p>
          <div className="grant__deadline">
            <span className="grant__deadline-label">Deadline</span>
            <time dateTime={grant.deadline.toJSON()}>
              <props.icon className="grant__deadline-icon" />
              {formatDate(grant.deadline)}
            </time>
          </div>
        </article>
      </CurrentOrganizationLink>
    </li>
  );
}
