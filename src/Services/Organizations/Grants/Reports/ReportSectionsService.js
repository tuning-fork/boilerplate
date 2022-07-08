export const mapReportSection = (apiReportSection) => ({
  uuid: apiReportSection.uuid,
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
  grantUuid,
  reportUuid,
  reportSectionUuid
) => {
  return organizationClient
    .get(
      `/grants/${grantUuid}/reports/${reportUuid}/report_sections/${reportSectionUuid}`
    )
    .then((response) => response.data);
};

// listReportSections

export const getAllReportSections = (
  organizationClient,
  grantUuid,
  reportUuid
) => {
  return organizationClient
    .get(`/grants/${grantUuid}/reports/${reportUuid}/report_sections/`)
    .then((response) => response.data);
};

// deleteReportSection

export const deleteReportSection = (
  organizationClient,
  grantUuid,
  reportUuid,
  reportSectionUuid
) => {
  return organizationClient
    .delete(
      `/grants/${grantUuid}/reports/${reportUuid}/report_sections/${reportSectionUuid}`
    )
    .then((response) => response.data);
};

// createReportSection

export const createReportSection = (
  organizationClient,
  grantUuid,
  reportUuid,
  newReportSection
) => {
  return organizationClient
    .post(
      `/grants/${grantUuid}/reports/${reportUuid}/report_sections`,
      mapReportSectionToApiReportSection(newReportSection)
    )
    .then((response) => response.data);
};

// updateReportSection

export const updateReportSection = (
  organizationClient,
  grantUuid,
  reportUuid,
  reportSectionUuid,
  fieldsToUpdate
) => {
  return organizationClient
    .patch(
      `/grants/${grantUuid}/reports/${reportUuid}/report_sections/${reportSectionUuid}/`,
      mapReportSectionToApiReportSection(fieldsToUpdate)
    )
    .then((response) => response.data);
};
