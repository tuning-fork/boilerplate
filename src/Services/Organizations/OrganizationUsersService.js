const mapUser = (apiUser) => ({
  createdAt: new Date(apiUser.created_at),
  email: apiUser.email,
  firstName: apiUser.first_name,
  id: apiUser.id.toString(),
  lastName: apiUser.last_name,
  updatedAt: new Date(apiUser.updated_at),
});

export const getAllUsers = (organizationClient) => {
  return organizationClient
    .get(`/users`)
    .then((response) => response.data.map(mapUser));
};
