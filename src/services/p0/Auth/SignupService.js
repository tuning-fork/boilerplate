import apiClient from "config/apiClient";

const mapUserToApiUser = (apiUser) => ({
  first_name: apiUser.first_name,
  last_name: apiUser.last_name,
  email: apiUser.email,
  active: apiUser.active,
  password: apiUser.password,
  password_confirmation: apiUser.password_confirmation,
});

export const createUser = (newUser) => {
  return apiClient
    .post("/users", mapUserToApiUser(newUser))
    .then((response) => response.data);
};
