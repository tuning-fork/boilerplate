export const mapReportSection = (apiReportSection) => ({
  id: apiReportSection.id.toString(),
  wordCount: apiReportSection.wordcount,
  title: apiReportSection.title,
  text: apiReportSection.text,
  sortOrder: apiReportSection.sort_order,
});

// getReportSection
export const getReportSection = (
  organizationClient,
  grantUuid,
  reportId,
  reportSectionId
) => {
  return organizationClient
    .get(
      `/grants/${grantUuid}/reports/${reportId}/report_sections/${reportSectionId}`
    )
    .then((response) => response.data);
};

// listReportSections

export const getAllReportSections = (
  organizationClient,
  grantUuid,
  reportId
) => {
  return organizationClient
    .get(`/grants/${grantUuid}/reports/${reportId}/report_sections/`)
    .then((response) => response.data);
};

// deleteReportSection

export const deleteReportSection = (
  organizationClient,
  grantUuid,
  reportId,
  reportSectionId
) => {
  return organizationClient
    .delete(
      `/grants/${grantUuid}/reports/${reportId}/report_sections/${reportSectionId}`
    )
    .then((response) => response.data);
};

// createReportSection

export const createReportSection = (
  organizationClient,
  grantUuid,
  reportId,
  newReportSection
) => {
  return organizationClient
    .post(
      `/grants/${grantUuid}/reports/${reportId}/report_sections`,
      newReportSection
    )
    .then((response) => response.data);
};

// updateReportSection

export const updateReportSection = (
  organizationClient,
  grantUuid,
  reportId,
  reportSectionId,
  fieldsToUpdate
) => {
  return organizationClient
    .patch(
      `/grants/${grantUuid}/reports/${reportId}/report_sections/${reportSectionId}/`,
      fieldsToUpdate
    )
    .then((response) => response.data);
};
