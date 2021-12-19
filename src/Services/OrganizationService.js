const mapOrganization = (apiOrganization) => ({
  createdAt: new Date(apiOrganization.created_at),
  id: apiOrganization.id.toString(),
  name: apiOrganization.name,
  updatedAt: new Date(apiOrganization.updated_at),
});

export const getUserOrganizations = (apiClient, userId) => {
  return apiClient
    .get(`/organization_users/assoc/${userId}`)
    .then((response) => response.data.map(mapOrganization));
};

export const getOrganization = (apiClient, organizationId) => {
  return apiClient
    .get(`/organizations/${organizationId}`)
    .then((response) => mapOrganization(response.data));
};
