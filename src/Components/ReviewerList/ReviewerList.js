import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { useQuery } from "react-query";
import TextBox from "../design/TextBox/TextBox";
import Button from "../design/Button/Button";
import "./ReviewerList.css";
import ReviewerListItem from "./ReviewerListItem";
import { getAllOrganizationUsers } from "../../Services/OrganizationService";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import { MdAddComment } from "react-icons/md";
import { check } from "prettier";

export default function ReviewerList() {
  const { organizationClient } = useCurrentOrganization();
  const { data: reviewers } = useQuery("getAllOrganizationUsers", () =>
    getAllOrganizationUsers(organizationClient)
  );
  const [requestedReviewers, setRequestedReviewers] = useState([]);

  const reviewerCheck = useCallback(
    (reviewer) => {
      check = requestedReviewers.reduce((requestedReviewer) => {
        return requestedReviewer.id === reviewer.id;
      });
      if (check.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    [requestedReviewers]
  );

  const addRequestedReviewer = useCallback(
    (newRequestedReviewer) => {
      if (reviewerCheck === false) {
        return;
      } else {
        setRequestedReviewers((requestedReviewers) => [
          ...requestedReviewers,
          newRequestedReviewer,
        ]);
      }
    },
    [setRequestedReviewers, reviewerCheck]
  );

  const removeRequestedReviewer = useCallback(
    (removedReviewer) => {
      setRequestedReviewers(
        requestedReviewers.filter((requestedReviewer) => {
          if (requestedReviewer.id !== removedReviewer.id) {
            return requestedReviewer;
          }
          // eslint-disable-next-line array-callback-return
          return;
        })
      );
      return requestedReviewers;
    },
    [setRequestedReviewers, requestedReviewers]
  );

  // const saveRequestedReviewers = useCallback(
  //   (boilerplate) => {
  //     requestedReviewers.forEach((requestedReviewer) =>
  //       requestedReviewer(boilerplate)
  //     );
  //   },
  //   [requestedReviewers]
  // );

  // const clearRequestedReviewers = useCallback(() => {
  //   setRequestedReviewers([]);
  // }, [setRequestedReviewers]);

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

  // const handleSaveRequestedReviewers = (event) => {
  //   //send update request to the backend
  //   setOpenEditReviewers(!false);
  // };

  return (
    <aside className="reviewer-list">
      <header className="reviewer-list__header">
        <h4>Reviewers</h4>
        <Button
          variant="none"
          onClick={() => setOpenEditReviewers(!openEditReviewers)}
        >
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
              <ReviewerListItem
                key={reviewer.id}
                reviewer={reviewer}
                onChecked={addRequestedReviewer}
                onUnchecked={removeRequestedReviewer}
              />
            ))}
          </ul>
          <div className="reviewer-list__save-button">
            <Button variant="text" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={"handleSave"}>Save</Button>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
