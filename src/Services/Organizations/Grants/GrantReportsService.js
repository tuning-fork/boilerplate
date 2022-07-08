import { mapReportSection } from "./Reports/ReportSectionsService";

const mapGrantReport = (apiGrantReport) => ({
  archived: apiGrantReport.archived,
  createdAt: new Date(apiGrantReport.created_at),
  deadline: new Date(apiGrantReport.deadline),
  grantUuid: apiGrantReport.grant_id,
  uuid: apiGrantReport.uuid,
  title: apiGrantReport.title,
  updatedAt: new Date(apiGrantReport.updated_at),
  reportSections: apiGrantReport.report_sections
    ? apiGrantReport.report_sections.map(mapReportSection)
    : [],
});

const mapGrantReportToApiGrantReport = (grantReport) => ({
  ...grantReport,
  grant_id: grantReport.grantUuid,
});

// getGrantReport
export const getGrantReport = (organizationClient, grantUuid, reportUuid) => {
  return organizationClient
    .get(`/grants/${grantUuid}/reports/${reportUuid}`)
    .then((response) => mapGrantReport(response.data));
};

// listGrantReports

export const getAllGrantReports = (organizationClient, grantUuid) => {
  return organizationClient
    .get(`/grants/${grantUuid}/reports/`)
    .then((response) => response.data.map(mapGrantReport));
};

// deleteGrantReport

export const deleteGrantReport = (
  organizationClient,
  grantUuid,
  reportUuid
) => {
  return organizationClient
    .delete(`/grants/${grantUuid}/reports/${reportUuid}`)
    .then((response) => response.data);
};

// createGrantReport

export const createGrantReport = (
  organizationClient,
  grantUuid,
  newGrantReport
) => {
  return organizationClient
    .post(
      `/grants/${grantUuid}/reports/`,
      mapGrantReportToApiGrantReport(newGrantReport)
    )
    .then((response) => response.data);
};

// updateGrantReport

export const updateGrantReport = (
  organizationClient,
  grantUuid,
  reportUuid,
  fieldsToUpdate
) => {
  return organizationClient
    .patch(
      `/grants/${grantUuid}/reports/${reportUuid}`,
      mapGrantReportToApiGrantReport(fieldsToUpdate)
    )
    .then((response) => response.data);
};

// copyGrantReport

export const copyGrantReport = (
  organizationClient,
  grantUuid,
  reportUuid,
  copyGrantReportFields
) => {
  return organizationClient
    .post(
      `/grants/${grantUuid}/reports/${reportUuid}/copy`,
      mapGrantReportToApiGrantReport(copyGrantReportFields)
    )
    .then((response) => response.data);
};
