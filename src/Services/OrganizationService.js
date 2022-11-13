import { mapUser } from "./Auth/LoginService";

const Roles = {
  USER: "user",
  ADMIN: "admin",
};

const mapOrganization = (apiOrganization) => ({
  createdAt: new Date(apiOrganization.created_at),
  id: apiOrganization.id,
  name: apiOrganization.name,
  updatedAt: new Date(apiOrganization.updated_at),
  users: apiOrganization.users.map(mapUser),
});

const mapOrganizationToApiOrganization = (organization) => ({
  ...organization,
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

export const createOrganization = async (authenticatedApiClient, fields) => {
  return authenticatedApiClient
    .post("/organizations", mapOrganizationToApiOrganization(fields))
    .then((response) => response.data);
};

export const deleteOrganizationUser = (organizationClient, userId) => {
  return organizationClient
    .delete(`/users/${userId}`)
    .then((response) => mapUser(response.data));
};

export const isUserAdmin = (organizationClient, userId) => {
  return organizationClient
    .get(`/users/${userId}`)
    .then((response) => response.data.roles.includes(Roles.ADMIN));
};
