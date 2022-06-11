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
import { check } from "prettier";

export default function ReviewerList({ grantId }) {
  const { currentOrganization, organizationClient } = useCurrentOrganization();
  const [requestedReviewers, setRequestedReviewers] = useState([]);
  const [currentReviewers, setCurrentReviewers] = useState([]);
  const { data: potentialReviewers } = useQuery("getAllOrganizationUsers", () =>
    getAllOrganizationUsers(organizationClient)
  );
  const { data } = useQuery(
    "getAllGrantReviewers",
    () => getAllGrantReviewers(organizationClient, grantId),
    {
      onSuccess: (data) => {
        setCurrentReviewers(data);
      },
    }
  );

  const noDupesReviewers = () => {
    if (currentReviewers.length === 0) {
      setRequestedReviewers(requestedReviewers);
    } else if (currentReviewers.length > 0) {
      const currentReviewerIds = currentReviewers.filter(
        (currentReviewer) => currentReviewer.id
      );
      setRequestedReviewers(() => {
        requestedReviewers.filter((requestedReviewer) =>
          currentReviewerIds.includes(requestedReviewer)
        );
      });
    }
  };

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
        setCurrentReviewers(
          currentReviewers.filter(
            (currentReviewer) => currentReviewer.id !== newRequestedReviewer.id
          )
        );
      }
    },
    [setRequestedReviewers, reviewerCheck, currentReviewers]
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
      setCurrentReviewers(...currentReviewers, removedReviewer);
      return requestedReviewers;
    },
    [setRequestedReviewers, requestedReviewers, currentReviewers]
  );

  const { mutate: createReviewer } = useMutation(
    (newReviewerFields) =>
      createGrantReviewer(organizationClient, grantId, newReviewerFields),
    {
      onSuccess: () => {
        alert("Reviewer created!");
      },
    }
  );

  const { mutate: deleteReviewer } = useMutation(
    (reviewerId) =>
      deleteGrantReviewer(organizationClient, grantId, reviewerId),
    {
      onSuccess: () => {
        alert("Reviewer deleted!");
      },
    }
  );

  // const saveRequestedReviewers = (current, requested) => {
  //   if (requestedReviewers && requestedReviewers.length > 0) {
  //     saveReviewerSelections(current, requested);
  //     deleteUncheckedReviewers(current, requested);
  //   } else {
  //     handleCancel();
  //   }
  //   handleCancel();
  //   setRequestedReviewers([]);
  // };

  // const addCheckedReviewers = (current, requested) => {
  //   requested.filter((requested) => {
  //     if (current && current.length > 0) {
  //       const currentIds = current.filter((current) => {
  //         return current.id;
  //       });
  //       if (currentIds.includes(requested.id)) {
  //         return;
  //       } else {
  //         const newReviewerFields = {
  //           grant_id: grantId,
  //           user_id: requested.id,
  //         };
  //         createReviewer({ ...newReviewerFields });
  //       }
  //     } else {
  //       const newReviewerFields = {
  //         grant_id: grantId,
  //         user_id: requested.id,
  //       };
  //       createReviewer({ ...newReviewerFields });
  //     }
  //   });
  // };

  // const deleteUncheckedReviewers = (current, requested) => {
  //   current.filter((current) => {
  //     if (current && current.length > 0) {
  //       const requestedIds = requested.filter((requested) => {
  //         return requested.id;
  //       });
  //       if (requestedIds.includes(current.id)) {
  //         return;
  //       } else {
  //         deleteReviewer(current.id);
  //       }
  //     } else {
  //       deleteReviewer(current.id);
  //     }
  //   });
  // };

  const saveReviewerSelections = (current, requested) => {
    const currentIds = current?.filter((current) => current.id);
    requested.filter((requested) => {
      if (!currentIds.includes(requested.id)) {
        const newReviewerFields = {
          grant_id: grantId,
          user_id: requested.id,
        };
        createReviewer({ ...newReviewerFields });
      }
    });
    setOpenEditReviewers(false);
    setRequestedReviewers([]);
  };

  const onClickRemove = (removedReviewer) => {
    setCurrentReviewers(() =>
      currentReviewers.filter(
        (currentReviewer) => currentReviewer.id !== removedReviewer.id
      )
    );
    deleteReviewer(removedReviewer.id);
  };

  const [searchFilters, setSearchFilters] = useState({
    name: "",
  });
  const [openEditReviewers, setOpenEditReviewers] = useState(false);
  const filteredReviewers = useMemo(() => {
    if (currentReviewers.length > 0) {
      const currentReviewerIds = currentReviewers.filter(
        (currentReviewer) => currentReviewer.id
      );
      return potentialReviewers.filter((potentialReviewer) =>
        currentReviewerIds.includes(potentialReviewer)
      );
    }
    return potentialReviewers.filter((potentialReviewer) => {
      const matchesName = potentialReviewer.firstName
        .concat(potentialReviewer.lastName || "")
        .toLowerCase()
        .includes(searchFilters.name.toLowerCase());
      return matchesName;
    });
  }, [potentialReviewers, searchFilters, currentReviewers]);

  const handleCancel = () => {
    setOpenEditReviewers(!openEditReviewers);
    setRequestedReviewers([]);
  };

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
      {currentReviewers && currentReviewers.length ? (
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
              <RequestedReviewerListItem
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
            <Button
              onClick={() =>
                saveReviewerSelections(currentReviewers, requestedReviewers)
              }
            >
              Save
            </Button>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
