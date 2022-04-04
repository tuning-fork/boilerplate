import { mapUser } from "./Auth/LoginService";

const mapOrganization = (apiOrganization) => ({
  createdAt: new Date(apiOrganization.created_at),
  id: apiOrganization.id.toString(),
  name: apiOrganization.name,
  updatedAt: new Date(apiOrganization.updated_at),
});

export const getUserOrganizations = (apiClient) => {
  return apiClient
    .get(`/organizations`)
    .then((response) => response.data.map(mapOrganization));
};

export const getOrganization = (apiClient, organizationId) => {
  return apiClient
    .get(`/organizations/${organizationId}`)
    .then((response) => mapOrganization(response.data));
};

export const getAllOrganizationUsers = async (organizationClient) => {
  return organizationClient
    .get(`/users`)
    .then((response) => response.data.map(mapUser));
};
