export const mapReportSection = (apiReportSection) => ({
  id: apiReportSection.id,
  wordCount: apiReportSection.wordcount,
  title: apiReportSection.title,
  text: apiReportSection.text,
  sortOrder: apiReportSection.sort_order,
});

const mapReportSectionToApiReportSection = (reportSection) => ({
  ...reportSection,
});

// getReportSection
export const getReportSection = (
  organizationClient,
  grantId,
  reportId,
  reportSectionId
) => {
  return organizationClient
    .get(
      `/grants/${grantId}/reports/${reportId}/report_sections/${reportSectionId}`
    )
    .then((response) => response.data);
};

// listReportSections

export const getAllReportSections = (organizationClient, grantId, reportId) => {
  return organizationClient
    .get(`/grants/${grantId}/reports/${reportId}/report_sections/`)
    .then((response) => response.data);
};

// deleteReportSection

export const deleteReportSection = (
  organizationClient,
  grantId,
  reportId,
  reportSectionId
) => {
  return organizationClient
    .delete(
      `/grants/${grantId}/reports/${reportId}/report_sections/${reportSectionId}`
    )
    .then((response) => response.data);
};

// createReportSection

export const createReportSection = (
  organizationClient,
  grantId,
  reportId,
  newReportSection
) => {
  return organizationClient
    .post(
      `/grants/${grantId}/reports/${reportId}/report_sections`,
      mapReportSectionToApiReportSection(newReportSection)
    )
    .then((response) => response.data);
};

// updateReportSection

export const updateReportSection = (
  organizationClient,
  grantId,
  reportId,
  reportSectionId,
  fieldsToUpdate
) => {
  return organizationClient
    .patch(
      `/grants/${grantId}/reports/${reportId}/report_sections/${reportSectionId}/`,
      mapReportSectionToApiReportSection(fieldsToUpdate)
    )
    .then((response) => response.data);
};
