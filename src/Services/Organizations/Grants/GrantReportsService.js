const mapGrantReport = (apiGrantReport) => ({
  archived: apiGrantReport.archived,
  createdAt: new Date(apiGrantReport.created_at),
  deadline: new Date(apiGrantReport.deadline),
  fundingOrgId: apiGrantReport.grant.funding_org_id.toString(),
  fundingOrgName: apiGrantReport.grant.funding_org_name,
  id: apiGrantReport.id.toString(),
  organizationId: apiGrantReport.organization_id.toString(),
  purpose: apiGrantReport.grant.purpose,
  rfpUrl: apiGrantReport.grant.rfp_url,
  title: apiGrantReport.title,
  updatedAt: new Date(apiGrantReport.updated_at),
  reportSections: apiGrantReport.report_sections
    ? apiGrantReport.report_sections.map(mapSection)
    : [],
});

const mapGrantReportToApiGrantReport = (grantReport) => ({
  ...grantReport,
  rfp_url: grantReport.rfpUrl,
  funding_org_id: grantReport.fundingOrgId,
  organization_id: grantReport.organizationId,
});

// getGrantReport
export const getGrantReport = (organizationClient, grantId, reportId) => {
  return organizationClient
    .get(`/grants/${grantId}/reports/${reportId}`)
    .then((response) => mapGrantReport(response.data));
};

// listGrantReports

export const getAllGrantReports = (organizationClient, grantId) => {
  return organizationClient
    .get(`/grants/${grantId}/reports/`)
    .then((response) => response.data.map(mapGrantReport));
};

// deleteGrantReport

export const deleteGrantReport = (organizationClient, grantId, reportId) => {
  return organizationClient
    .delete(`/grants/${grantId}/reports/${reportId}`)
    .then((response) => response.data);
};

// createGrantReport

export const createGrantReport = (
  organizationClient,
  grantId,
  newGrantReport
) => {
  return organizationClient
    .post(
      `/grants/${grantId}/reports/`,
      mapGrantReportToApiGrantReport(newGrantReport)
    )
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
    .patch(
      `/grants/${grantId}/reports/${reportId}`,
      mapGrantReportToApiGrantReport(fieldsToUpdate)
    )
    .then((response) => response.data);
};

// copyGrantReport

export const copyGrantReport = (
  organizationClient,
  grantId,
  reportId,
  copyGrantReportFields
) => {
  return organizationClient
    .post(
      `/grants/${grantId}/reports/${reportId}/copy`,
      mapGrantReportToApiGrantReport(copyGrantReportFields)
    )
    .then((response) => response.data);
};
