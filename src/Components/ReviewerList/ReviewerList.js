import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { useQuery, useMutation } from "react-query";
import TextBox from "../design/TextBox/TextBox";
import Button from "../design/Button/Button";
import "./ReviewerList.css";
import ReviewerListItem from "./ReviewerListItem";
import { getAllOrganizationUsers } from "../../Services/OrganizationService";
import {
  getAllGrantReviewers,
  createGrantReviewer,
} from "../../Services/Organizations/Grants/GrantReviewersService";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import { MdAddComment } from "react-icons/md";
import { check } from "prettier";

export default function ReviewerList({ grantId }) {
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const { data: potentialReviewers } = useQuery("getAllOrganizationUsers", () =>
    getAllOrganizationUsers(organizationClient)
  );
  const { data: currentReviewers } = useQuery("getAllReviewers", () => {
    getAllGrantReviewers(organizationClient);
  });
  const [requestedReviewers, setRequestedReviewers] = useState([]);

  const { mutate: createReviewer } = useMutation(
    (newReviewerFields) =>
      createGrantReviewer(organizationClient, grantId, newReviewerFields),
    {
      onSuccess: () => {
        alert("Reviewer created!");
      },
    }
  );

  const handleCreateReviewer = (newReviewer) => {
    createReviewer({
      grantId: grantId,
      reviewerId: newReviewer.id,
    });
  };

  // const { mutate: deleteReviewer } = useMutation(
  //   (reviewerFields) =>
  //     GrantReviewerService.deleteReviewer(
  //       organizationClient,
  //       reviewerFields.id,
  //       reviewerFields
  //     ),
  //   {
  //     onSuccess: () => {
  //       alert("Reviewer deleted!");
  //     },
  //   }
  // );

  // const handleDeleteReviewer = (reviewerFields) => {
  //   deleteReviewer({
  //     reviewerFields,
  //   });
  // };

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

  const saveRequestedReviewers = () => {
    requestedReviewers.filter((requestedReviewer) => {
      if (currentReviewers && currentReviewers.length > 0) {
        const currentReviewersIds = currentReviewers.filter(
          (currentReviewer) => {
            return currentReviewer.id;
          }
        );
        if (currentReviewersIds.includes(requestedReviewer.id)) {
          return;
        } else {
          handleCreateReviewer(requestedReviewer);
        }
      } else {
        handleCreateReviewer(requestedReviewer);
      }
    });
  };

  const [searchFilters, setSearchFilters] = useState({
    name: "",
  });
  const [openEditReviewers, setOpenEditReviewers] = useState(false);
  const filteredReviewers = useMemo(() => {
    return potentialReviewers.filter((potentialReviewer) => {
      const matchesName = potentialReviewer.firstName
        .concat(potentialReviewer.lastName || "")
        .toLowerCase()
        .includes(searchFilters.name.toLowerCase());
      return matchesName;
    });
  }, [potentialReviewers, searchFilters]);

  const handleCancel = () => {
    setOpenEditReviewers(!openEditReviewers);
  };

  // const handleSaveRequestedReviewers = (event) => {
  //   //send update request to the backend
  //   setOpenEditReviewers(!openEditReviewers);
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
            <Button onClick={saveRequestedReviewers}>Save</Button>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
