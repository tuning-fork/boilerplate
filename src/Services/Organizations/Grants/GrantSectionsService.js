// createGrant

export const createGrantSection = (
  organizationClient,
  grantId,
  newGrantSection
) => {
  return organizationClient
    .post(`/grants/${grantId}/reports`, newGrantSection)
    .then((response) => response.data);
};
