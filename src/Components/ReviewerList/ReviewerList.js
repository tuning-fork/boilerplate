import React, { useState, useEffect, useContext, useMemo } from "react";
import { useQuery } from "react-query";
import TextBox from "../design/TextBox/TextBox";
import Button from "../design/Button/Button";
import "./ReviewerList.css";
import ReviewerListItem from "./ReviewerListItem";
import { getAllOrganizationUsers } from "../../Services/OrganizationService";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import { MdAddComment } from "react-icons/md";

export default function ReviewerList() {
  const { organizationClient } = useCurrentOrganization();
  const { data: reviewers } = useQuery("getAllOrganizationUsers", () =>
    getAllOrganizationUsers(organizationClient)
  );
  const [requestedReviewers, setRequestedReviewers] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    name: "",
  });
  const [openEditReviewers, setOpenEditReviewers] = useState(false);
  const filteredReviewers = useMemo(() => {
    return reviewers.filter((reviewer) => {
      const matchesName = reviewer.firstName
        .concat(reviewer.lastName || "")
        .toLowerCase()
        .includes(searchFilters.name.toLowerCase());
      return matchesName;
    });
  }, [reviewers, searchFilters]);

  const handleCancel = (event) => {
    setOpenEditReviewers(false);
  };

  const handleSaveRequestedReviewers = (event) => {
    //send update request to the backend
    setOpenEditReviewers(false);
  };

  return (
    <aside className="reviewer-list">
      <header className="reviewer-list__header">
        <h4>Reviewers</h4>
        <Button variant="none" onClick={() => setOpenEditReviewers(true)}>
          <MdAddComment className="reviewer-list__edit-icon" />
        </Button>
      </header>
      {requestedReviewers.length ? (
        <ul className="reviewer-list__reviewers-index">
          {requestedReviewers.map((reviewer) => (
            <ReviewerListItem key={reviewer.id} reviewer={reviewer} />
          ))}
        </ul>
      ) : (
        <div className="reviewer-list__suggestions-text">
          No reviewers selected yet.
        </div>
      )}
      {openEditReviewers ? (
        <div>
          <header className="reviewer-list__header">
            <h4>Request Review</h4>
          </header>
          <TextBox
            labelText="Search for Reviewers"
            onChange={(event) =>
              setSearchFilters({ ...searchFilters, name: event.target.value })
            }
          />
          <div className="reviewer-list__suggestions-text">Suggestions</div>
          <ul className="reviewer-list__reviewers-index">
            {filteredReviewers.map((reviewer) => (
              <ReviewerListItem key={reviewer.id} reviewer={reviewer} />
            ))}
          </ul>
          <div className="reviewer-list__save-button">
            <Button variant="text" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSaveRequestedReviewers}>Save</Button>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
