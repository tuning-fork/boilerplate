import React, { useState, useEffect, useContext, useMemo } from "react";
import { useQuery } from "react-query";
import TextBox from "../design/TextBox/TextBox";
import "./ReviewerList.css";
import ReviewerListItem from "./ReviewerListItem";
import { getAllOrganizationUsers } from "../../Services/OrganizationService";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";

export default function ReviewerList() {
  const { organizationClient } = useCurrentOrganization();
  const { data: reviewers } = useQuery("getAllOrganizationUsers", () =>
    getAllOrganizationUsers(organizationClient)
  );
  const [requestedReviewers, setRequestedReviewers] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    name: "",
  });
  const filteredReviewers = useMemo(() => {
    return reviewers.filter((reviewer) => {
      const matchesName = reviewer.firstName
        .concat(reviewer.lastName || "")
        .toLowerCase()
        .includes(searchFilters.name.toLowerCase());
      return matchesName;
    });
  }, [reviewers, searchFilters]);

  return (
    <aside className="reviewer-list">
      <header className="reviewer-list__header">
        <h2 className="heading-4">Select Reviewer</h2>
      </header>

      <TextBox
        labelText="Search"
        onChange={(event) =>
          setSearchFilters({ ...searchFilters, name: event.target.value })
        }
      />
      <ul className="reviewer-list__reviewers-index">
        {filteredReviewers.map((reviewer) => (
          <ReviewerListItem key={reviewer.id} reviewer={reviewer} />
        ))}
      </ul>
    </aside>
  );
}
