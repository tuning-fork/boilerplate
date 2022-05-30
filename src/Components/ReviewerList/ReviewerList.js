import React from "react";
import { useQuery } from "react-query";
import "./ReviewerList.css";
import ReviewerListItem from "./ReviewerListItem";
import { getAllOrganizationUsers } from "../../Services/OrganizationService";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";

export default function ReviewerList() {
  const { organizationClient } = useCurrentOrganization();
  const { data: reviewers } = useQuery("getAllOrganizationUsers", () =>
    getAllOrganizationUsers(organizationClient)
  );

  return (
    <aside className="reviewer-list">
      <header className="reviewer-list__header">
        <h2 className="heading-4">Select Reviewer</h2>
      </header>
      <ul className="reviewer-list__reviewers-index">
        {reviewers.map((reviewer) => (
          <ReviewerListItem key={reviewer.id} reviewer={reviewer} />
        ))}
      </ul>
    </aside>
  );
}
