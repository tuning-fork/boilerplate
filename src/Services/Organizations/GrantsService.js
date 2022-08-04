import { mapSection } from "./Grants/SectionsService";

const mapGrant = (apiGrant) => ({
  archived: apiGrant.archived,
  createdAt: new Date(apiGrant.created_at),
  deadline: new Date(apiGrant.deadline),
  fundingOrgId: apiGrant.funding_org_id,
  fundingOrgName: apiGrant.funding_org_name,
  id: apiGrant.id,
  organizationId: apiGrant.organization_id,
  purpose: apiGrant.purpose,
  rfpUrl: apiGrant.rfp_url,
  submitted: apiGrant.submitted,
  successful: apiGrant.successful,
  title: apiGrant.title,
  updatedAt: new Date(apiGrant.updated_at),
  sections: apiGrant.sections ? apiGrant.sections.map(mapSection) : [],
});

const mapGrantToApiGrant = (grant) => ({
  ...grant,
  rfp_url: grant.rfpUrl,
  funding_org_id: grant.fundingOrgId,
  organization_id: grant.organizationId,
});

// getGrant
export const getGrant = (organizationClient, grantId) => {
  return organizationClient
    .get(`/grants/${grantId}`)
    .then((response) => mapGrant(response.data));
};

// listGrants

export const getAllGrants = (organizationClient) => {
  return organizationClient
    .get(`/grants`)
    .then((response) => response.data.map(mapGrant));
};

// deleteGrant

export const deleteGrant = (organizationClient, grantId) => {
  return organizationClient
    .delete(`/grants/${grantId}`)
    .then((response) => response.data);
};

// createGrant

export const createGrant = (organizationClient, newGrant) => {
  return organizationClient
    .post(`/grants/`, mapGrantToApiGrant(newGrant))
    .then((response) => response.data);
};

// updateGrant

export const updateGrant = (organizationClient, grantId, fieldsToUpdate) => {
  return organizationClient
    .patch(`/grants/${grantId}`, mapGrantToApiGrant(fieldsToUpdate))
    .then((response) => response.data);
};

// copyGrant

export const copyGrant = (organizationClient, grantId, copyGrantFields) => {
  return organizationClient
    .post(`/grants/${grantId}/copy`, mapGrantToApiGrant(copyGrantFields))
    .then((response) => response.data);
};
