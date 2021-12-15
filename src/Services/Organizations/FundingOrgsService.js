const mapFundingOrg = (apiFundingOrg) => ({
  createdAt: new Date(apiFundingOrg.created_at),
  updatedAt: new Date(apiFundingOrg.updated_at),
  name: apiFundingOrg.name,
  website: apiFundingOrg.website,
  id: apiFundingOrg.id.toString(),
  organizationId: apiFundingOrg.organization_id.toString(),
});

// getFundingOrg
export const getFundingOrg = (organizationClient, fundingOrgId) => {
  return organizationClient
    .get(`/funding_orgs/${fundingOrgId}`)
    .then((response) => response.data);
};

// listFundingOrgs

export const getAllFundingOrgs = (organizationClient) => {
  return organizationClient
    .get(`/funding_orgs/`)
    .then((response) => response.data.map(mapFundingOrg));
};

// deleteFundingOrg

export const deleteFundingOrg = (organizationClient, fundingOrgId) => {
  return organizationClient
    .delete(`/funding_orgs/${fundingOrgId}`)
    .then((response) => response.data);
};

// createFundingOrg

export const createFundingOrg = (organizationClient, newFundingOrg) => {
  return organizationClient
    .post(`/funding_orgs/`, newFundingOrg)
    .then((response) => response.data);
};

// updateFundingOrg

export const updateFundingOrg = (
  organizationClient,
  fundingOrgId,
  fieldsToUpdate
) => {
  return organizationClient
    .patch(`/funding_orgs/${fundingOrgId}`, fieldsToUpdate)
    .then((response) => response.data);
};
