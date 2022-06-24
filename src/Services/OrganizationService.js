import { mapUser } from "./Auth/LoginService";

const mapOrganization = (apiOrganization) => ({
  createdAt: new Date(apiOrganization.created_at),
  uuid: apiOrganization.uuid,
  name: apiOrganization.name,
  updatedAt: new Date(apiOrganization.updated_at),
});

export const getUserOrganizations = (apiClient) => {
  return apiClient
    .get(`/organizations`)
    .then((response) => response.data.map(mapOrganization));
};

export const getOrganization = (apiClient, organizationUuid) => {
  return apiClient
    .get(`/organizations/${organizationUuid}`)
    .then((response) => mapOrganization(response.data));
};

export const getAllOrganizationUsers = async (organizationClient) => {
  return organizationClient
    .get(`/users`)
    .then((response) => response.data.map(mapUser));
};
