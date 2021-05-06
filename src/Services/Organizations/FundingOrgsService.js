// getFundingOrg
export const getFundingOrg = (organizationService, fundingOrgId) => {
  return organizationService
    .get(`/funding_orgs/${fundingOrgId}`)
    .then((response) => response.data);
};

// listFundingOrgs

export const getAllFundingOrgs = (organizationService) => {
  return organizationService
    .get(`/funding_orgs/`)
    .then((response) => response.data);
};

// deleteFundingOrg

export const deleteFundingOrg = (organizationService) => {
  return organizationService
    .delete(`/funding_orgs/`)
    .then((response) => response.data);
};

// createFundingOrg

export const createFundingOrg = (organizationService) => {
  return organizationService
    .post(`/funding_orgs/`)
    .then((response) => response.data);
};

// updateFundingOrg

export const updateFundingOrg = (
  organizationService,
  fundingOrgId,
  fieldsToUpdate
) => {
  return organizationService
    .patch(`/funding_orgs/${fundingOrgId}`, fieldsToUpdate)
    .then((response) => response.data);
};
