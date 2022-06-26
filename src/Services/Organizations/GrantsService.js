import { mapSection } from "./Grants/SectionsService";

const mapGrant = (apiGrant) => ({
  archived: apiGrant.archived,
  createdAt: new Date(apiGrant.created_at),
  deadline: new Date(apiGrant.deadline),
  fundingOrgUuid: apiGrant.funding_org_uuid,
  fundingOrgName: apiGrant.funding_org_name,
  uuid: apiGrant.uuid,
  organizationUuid: apiGrant.organization_uuid,
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
  funding_org_id: grant.fundingOrgUuid,
  organization_id: grant.organizationUuid,
});

// getGrant
export const getGrant = (organizationClient, grantUuid) => {
  return organizationClient
    .get(`/grants/${grantUuid}`)
    .then((response) => mapGrant(response.data));
};

// listGrants

export const getAllGrants = (organizationClient) => {
  return organizationClient
    .get(`/grants`)
    .then((response) => response.data.map(mapGrant));
};

// deleteGrant

export const deleteGrant = (organizationClient, grantUuid) => {
  return organizationClient
    .delete(`/grants/${grantUuid}`)
    .then((response) => response.data);
};

// createGrant

export const createGrant = (organizationClient, newGrant) => {
  return organizationClient
    .post(`/grants/`, mapGrantToApiGrant(newGrant))
    .then((response) => response.data);
};

// updateGrant

export const updateGrant = (organizationClient, grantUuid, fieldsToUpdate) => {
  return organizationClient
    .patch(`/grants/${grantUuid}`, mapGrantToApiGrant(fieldsToUpdate))
    .then((response) => response.data);
};

// copyGrant

export const copyGrant = (organizationClient, grantUuid, copyGrantFields) => {
  return organizationClient
    .post(`/grants/${grantUuid}/copy`, mapGrantToApiGrant(copyGrantFields))
    .then((response) => response.data);
};
