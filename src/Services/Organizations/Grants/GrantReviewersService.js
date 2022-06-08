export const mapReviewer = (apiReviewer) => ({
  id: apiReviewer.id.toString(),
  grantsId: apiReviewer.grants_id.toString(),
  usersId: apiReviewer.users_id.toString(),
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
    .then((response) => response.data);
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
export const updateGrantReviewer = (
  organizationClient,
  grantId,
  reviewerId,
  fieldsToUpdate
) => {
  return organizationClient
    .patch(`/grants/${grantId}/reviewers/${reviewerId}`, fieldsToUpdate)
    .then((response) => response.data);
};

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
