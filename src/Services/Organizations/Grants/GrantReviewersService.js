export const mapReviewer = (apiReviewer) => ({
  id: apiReviewer.id.toString(),
  grantId: apiReviewer.grant_id.toString(),
  userId: apiReviewer.user_id.toString(),
  firstName: apiReviewer.user_first_name,
  lastName: apiReviewer.user_last_name,
});

// getGrantReviewer
export const getGrantReviewer = (organizationClient, grantId, reviewerId) => {
  return organizationClient
    .get(`/grants/${grantId}/reviewers/${reviewerId}`)
    .then((response) => response.data);
};

// listGrantReviewers

export const getAllGrantReviewers = (organizationClient, grantId) => {
  return organizationClient
    .get(`/grants/${grantId}/reviewers/`)
    .then((response) => response.data.map(mapReviewer));
};

// createGrantReviewer

export const createGrantReviewer = (
  organizationClient,
  grantId,
  newReviewerFields
) => {
  return organizationClient
    .post(`/grants/${grantId}/reviewers/`, newReviewerFields)
    .then((response) => response.data);
};

// updateGrantReviewer
// for later - stub awaiting more reviewer functionality
// export const updateGrantReviewer = (
//   organizationClient,
//   grantId,
//   reviewerId,
//   fieldsToUpdate
// ) => {
//   return organizationClient
//     .patch(`/grants/${grantId}/reviewers/${reviewerId}`, fieldsToUpdate)
//     .then((response) => response.data);
// };

// deleteGrantReviewer

export const deleteGrantReviewer = (
  organizationClient,
  grantId,
  reviewerId
) => {
  return organizationClient
    .delete(`/grants/${grantId}/reviewers/${reviewerId}`)
    .then((response) => response.data);
};

//bulk create and delete function to overwrite previously saved selected_reviewers
//and replace with new selected_reviewers
export const saveSelectedReviewers = (
  organizationClient,
  grantId,
  selectedReviewers
) => {
  return organizationClient
    .post(
      `/grants/${grantId}/reviewers/save_selected_reviewers`,
      selectedReviewers
    )
    .then((response) => response.data);
};
