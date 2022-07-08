const mapFundingOrg = (apiFundingOrg) => ({
  createdAt: new Date(apiFundingOrg.created_at),
  updatedAt: new Date(apiFundingOrg.updated_at),
  name: apiFundingOrg.name,
  website: apiFundingOrg.website,
  archived: apiFundingOrg.archived,
  uuid: apiFundingOrg.uuid,
  organizationUuid: apiFundingOrg.organization_uuid,
});

const mapFundingOrgToApiFundingOrg = (fundingOrg) => ({
  ...fundingOrg,
  organization_id: fundingOrg.organizationUuid,
});

// getFundingOrg
export const getFundingOrg = (organizationClient, fundingOrgUuid) => {
  return organizationClient
    .get(`/funding_orgs/${fundingOrgUuid}`)
    .then((response) => response.data);
};

// listFundingOrgs

export const getAllFundingOrgs = (organizationClient) => {
  return organizationClient
    .get(`/funding_orgs/`)
    .then((response) => response.data.map(mapFundingOrg));
};

// deleteFundingOrg

export const deleteFundingOrg = (organizationClient, fundingOrgUuid) => {
  return organizationClient
    .delete(`/funding_orgs/${fundingOrgUuid}`)
    .then((response) => response.data);
};

// createFundingOrg

export const createFundingOrg = (organizationClient, newFundingOrg) => {
  return organizationClient
    .post(`/funding_orgs/`, mapFundingOrgToApiFundingOrg(newFundingOrg))
    .then((response) => response.data);
};

// updateFundingOrg

export const updateFundingOrg = (
  organizationClient,
  fundingOrgUuid,
  fieldsToUpdate
) => {
  return organizationClient
    .patch(
      `/funding_orgs/${fundingOrgUuid}`,
      mapFundingOrgToApiFundingOrg(fieldsToUpdate)
    )
    .then((response) => response.data);
};
