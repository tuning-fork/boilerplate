// getGrantReport
export const getGrantReport = (organizationClient, grantId, grantSectionId) => {
  return organizationClient
    .get(`/grants/${grantId}/reports/${reportId}`)
    .then((response) => response.data);
};

// listGrantReports

export const getAllGrantReports = (organizationClient, grantId) => {
  return organizationClient
    .get(`/grants/${grantId}/reports/`)
    .then((response) => response.data);
};

// deleteGrantReport

export const deleteGrantReport = (organizationClient, grantId, reportId) => {
  return organizationClient
    .delete(`/grants/${grantId}/reports/${reportId}`)
    .then((response) => response.data);
};

// createGrantReport

export const createGrantReport = (organizationClient, grantId, newReport) => {
  return organizationClient
    .post(`/grants/${grantId}/reports/`, newReport)
    .then((response) => response.data);
};

// updateGrantReport

export const updateGrantReport = (
  organizationClient,
  grantId,
  reportId,
  fieldsToUpdate
) => {
  return organizationClient
    .patch(`/grants/${grantId}/reports/${reportId}`, fieldsToUpdate)
    .then((response) => response.data);
};
