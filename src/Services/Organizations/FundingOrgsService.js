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
    .then((response) => response.data);
};

// deleteFundingOrg

export const deleteFundingOrg = (organizationClient) => {
  return organizationClient
    .delete(`/funding_orgs/`)
    .then((response) => response.data);
};

// createFundingOrg

export const createFundingOrg = (organizationClient) => {
  return organizationClient
    .post(`/funding_orgs/`)
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
