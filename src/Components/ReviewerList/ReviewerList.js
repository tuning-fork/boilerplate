import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useQuery, useMutation } from "react-query";
import TextBox from "../design/TextBox/TextBox";
import Button from "../design/Button/Button";
import "./ReviewerList.css";
import RequestedReviewerListItem from "./RequestedReviewerListItem";
import CurrentReviewerListItem from "./CurrentReviewerListItem";
import { getAllOrganizationUsers } from "../../Services/OrganizationService";
import {
  getAllGrantReviewers,
  createGrantReviewer,
  deleteGrantReviewer,
} from "../../Services/Organizations/Grants/GrantReviewersService";
import { useCurrentOrganization } from "../../Contexts/currentOrganizationContext";
import { MdAddComment } from "react-icons/md";

export default function ReviewerList({ grantId }) {
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  //hook for array of current/created reviewers to display:
  // const [currentReviewers, setCurrentReviewers] = useState([]);
  //hook for array of checked reviewers to select/deselect:
  const [requestedReviewers, setRequestedReviewers] = useState([]);
  //hook for array of potential reviewers to select/deselect:
  const [potentialReviewers, setPotentialReviewers] = useState([]);
  //hook for search filters to filter by reviewer name:
  const [searchFilters, setSearchFilters] = useState({
    name: "",
  });
  //hook for boolean to toggle open edit reviewer panel:
  const [openEditReviewers, setOpenEditReviewers] = useState(false);
  //react-query query to get all organization.users/potential reviewers:

  useQuery(
    "getAllOrganizationUsers",
    () => getAllOrganizationUsers(organizationClient),
    {
      onSuccess(populatesPotentialReviewers) {
        setPotentialReviewers(populatesPotentialReviewers);
      },
    }
  );
  //react-query query to get all grant.reviewers/current reviewers and save in current reviewers state hook:
  const { data: currentReviewers } = useQuery("getAllGrantReviewers", () =>
    getAllGrantReviewers(organizationClient, grantId)
  );

  //quick reduce function to make sure that onChecked selected requestedReviewer is not already in the array:
  // const reviewerCheck = useCallback(
  //   (reviewer) => {
  //     check = requestedReviewers.reduce((requestedReviewer) => {
  //       return requestedReviewer.id === reviewer.id;
  //     });
  //     if (check.length > 0) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   },
  //   [requestedReviewers]
  // );
  // //on checked function to add potential reviewer to requested reviewer array:
  const addRequestedReviewer = useCallback(
    (newRequestedReviewer) => {
      if (reviewerCheck === false) {
        return;
      } else {
        setRequestedReviewers((requestedReviewers) => [
          ...requestedReviewers,
          newRequestedReviewer,
        ]);
        // maybe this is an API call?
        // setCurrentReviewers(
        //   currentReviewers.filter(
        //     (currentReviewer) => currentReviewer.id !== newRequestedReviewer.id
        //   )
        // );
      }
    },
    [setRequestedReviewers, reviewerCheck, currentReviewers]
  );
  // //on unchecked function to remove potential reviewer from requested reviewer array:
  // const removeRequestedReviewer = useCallback(
  //   (removedReviewer) => {
  //     setRequestedReviewers(
  //       requestedReviewers.filter((requestedReviewer) => {
  //         if (requestedReviewer.id !== removedReviewer.id) {
  //           return requestedReviewer;
  //         }
  //         // eslint-disable-next-line array-callback-return
  //         return;
  //       })
  //     );
  //     setCurrentReviewers(...currentReviewers, removedReviewer);
  //     return requestedReviewers;
  //   },
  //   [setRequestedReviewers, requestedReviewers, currentReviewers]
  // );
  // //react-query mutation to create new reviewer (grant_user join table) in database:
  // const { mutate: createReviewer } = useMutation(
  //   (newReviewerFields) =>
  //     createGrantReviewer(organizationClient, grantId, newReviewerFields),
  //   {
  //     onSuccess: () => {
  //       alert("Reviewer created!");
  //     },
  //   }
  // );
  // //react-query mutation to delete current reviewer (grant_user join table) in database
  // const { mutate: deleteReviewer } = useMutation(
  //   (reviewerId) =>
  //     deleteGrantReviewer(organizationClient, grantId, reviewerId),
  //   {
  //     onSuccess: () => {
  //       alert("Reviewer deleted!");
  //     },
  //   }
  // );
  // //on save function to save new reviewer selections -
  // //runs create reviewer on any checked users in requested reviewers array
  // const saveReviewerSelections = (current, requested) => {
  //   const currentIds = current?.filter((current) => current.id);
  //   requested.filter((requested) => {
  //     if (!currentIds.includes(requested.id)) {
  //       const newReviewerFields = {
  //         grant_id: grantId,
  //         user_id: requested.id,
  //       };
  //       createReviewer({ ...newReviewerFields });
  //     }
  //   });
  //   setOpenEditReviewers(false);
  //   setRequestedReviewers([]);
  // };
  // //on click function to delete un-selected current reviewers -
  // //runs delete reviewer on a current reviewer when the user clicks x
  // const onClickRemove = (removedReviewer) => {
  //   setCurrentReviewers(() =>
  //     currentReviewers.filter(
  //       (currentReviewer) => currentReviewer.id !== removedReviewer.id
  //     )
  //   );
  //   deleteReviewer(removedReviewer.id);
  // };
  // //filter function that filters potential reviewers
  // //to de-dupe current reviewers
  // //and then based on search filter input
  // const filteredReviewers = useMemo(() => {
  //   if (currentReviewers.length > 0) {
  //     const currentReviewerIds = currentReviewers.filter(
  //       (currentReviewer) => currentReviewer.id
  //     );
  //     setPotentialReviewers(
  //       potentialReviewers.filter((potentialReviewer) =>
  //         currentReviewerIds.includes(potentialReviewer)
  //       )
  //     );
  //   }
  //   setPotentialReviewers(
  //     potentialReviewers.filter((potentialReviewer) => {
  //       const matchesName = potentialReviewer.firstName
  //         .concat(potentialReviewer.lastName || "")
  //         .toLowerCase()
  //         .includes(searchFilters.name.toLowerCase());
  //       return matchesName;
  //     })
  //   );
  // }, [potentialReviewers, searchFilters, currentReviewers]);
  // //handle cancel function that sets edit panel toggle to not-open and clears requested reviewers array
  // const handleCancel = () => {
  //   setOpenEditReviewers(!openEditReviewers);
  //   setRequestedReviewers([]);
  // };

  // if (populatesPotentialReviewers.isLoading) {
  //   return "Loading...";
  // }

  // if (populatesCurrentReviewers.isLoading) {
  //   return "Loading...";
  // }

  // if (populatesCurrentReviewers.data && populatesPotentialReviewers.data) {
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
            <RequestedReviewerListItem key={reviewer.id} reviewer={reviewer} />
          ))}
        </ul>
      ) : (
        <div className="reviewer-list__suggestions-text">
          No reviewers selected yet.
        </div>
      )}
      {/* {currentReviewers && currentReviewers.length ? (
        <ul className="reviewer-list__current-reviewers-index">
          {currentReviewers.map((reviewer) => (
            <CurrentReviewerListItem
              key={reviewer.id}
              reviewer={reviewer}
              onClickRemove={onClickRemove}
            />
          ))}
        </ul>
      ) : (
        <div className="reviewer-list__suggestions-text">
          No reviewers saved.
        </div>
      )} */}
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
            {/* {filteredReviewers.map((reviewer) => (
              <RequestedReviewerListItem
                key={reviewer.id}
                reviewer={reviewer}
                // onChecked={addRequestedReviewer}
                // onUnchecked={removeRequestedReviewer}
              />
            ))} */}
          </ul>
          <div className="reviewer-list__save-button">
            <Button
              variant="text"
              // onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              onClick={
                () => console.log("hi")
                /*
                saveReviewerSelections(currentReviewers, requestedReviewers)
                */
              }
            >
              Save
            </Button>
          </div>
        </div>
      ) : null}
    </aside>
  );
  // }
}
