export const createReportSection = (
  organization,
  grantId,
  reportId,
  newGrantSection
) => {
  return organizationClient
    .post(`/grants/${grantId}/reports/${reportId}/sections`, newReportSection)
    .then((response) => response.data);
};
