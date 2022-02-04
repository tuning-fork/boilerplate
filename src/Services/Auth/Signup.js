// import axios from "axios";

const mapUserToApiUser = (apiUser) => ({
  first_name: apiUser.first_name,
  last_name: apiUser.lastName,
  email: apiUser.email,
  active: apiUser.active,
  password: apiUser.password,
  password_confirmation: apiUser.password_confirmation,
});

export const createUser = (organizationClient, newUser) => {
  return organizationClient
    .post(`/users/`, mapUserToApiUser(newUser))
    .then((response) => response.data);
};
