import { mapReportSection } from "./Reports/ReportSectionsService";

const mapGrantReport = (apiGrantReport) => ({
  archived: apiGrantReport.archived,
  createdAt: new Date(apiGrantReport.created_at),
  deadline: new Date(apiGrantReport.deadline),
  // fundingOrgId: apiGrantReport.grant.funding_org_id.toString(),
  // fundingOrgName: apiGrantReport.grant.funding_org_name,
  id: apiGrantReport.id.toString(),
  // organizationUuid: apiGrantReport.grant.organization_id.toString(),
  // purpose: apiGrantReport.grant.purpose,
  // rfpUrl: apiGrantReport.grant.rfp_url,
  title: apiGrantReport.title,
  updatedAt: new Date(apiGrantReport.updated_at),
  reportSections: apiGrantReport.report_sections
    ? apiGrantReport.report_sections.map(mapReportSection)
    : [],
});

const mapGrantReportToApiGrantReport = (grantReport) => ({
  ...grantReport,
  // rfp_url: grantReport.grant.rfpUrl,
  // funding_org_id: grantReport.grant.fundingOrgId,
  // organization_id: grantReport.grant.organizationUuid,
});

// getGrantReport
export const getGrantReport = (organizationClient, grantUuid, reportId) => {
  return organizationClient
    .get(`/grants/${grantUuid}/reports/${reportId}`)
    .then((response) => mapGrantReport(response.data));
};

// listGrantReports

export const getAllGrantReports = (organizationClient, grantUuid) => {
  return organizationClient
    .get(`/grants/${grantUuid}/reports/`)
    .then((response) => response.data.map(mapGrantReport));
};

// deleteGrantReport

export const deleteGrantReport = (organizationClient, grantUuid, reportId) => {
  return organizationClient
    .delete(`/grants/${grantUuid}/reports/${reportId}`)
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
  reportId,
  fieldsToUpdate
) => {
  return organizationClient
    .patch(
      `/grants/${grantUuid}/reports/${reportId}`,
      mapGrantReportToApiGrantReport(fieldsToUpdate)
    )
    .then((response) => response.data);
};

// copyGrantReport

export const copyGrantReport = (
  organizationClient,
  grantUuid,
  reportId,
  copyGrantReportFields
) => {
  return organizationClient
    .post(
      `/grants/${grantUuid}/reports/${reportId}/copy`,
      mapGrantReportToApiGrantReport(copyGrantReportFields)
    )
    .then((response) => response.data);
};
