import apiClient from "../../config/apiClient";

export const mapUser = (apiUser) => ({
  active: apiUser.active,
  createdAt: new Date(apiUser.created_at),
  email: apiUser.email,
  firstName: apiUser.first_name,
  id: apiUser.id.toString(),
  lastName: apiUser.last_name,
  updatedAt: new Date(apiUser.updated_at),
});

export async function login(email, password) {
  const createSessionResponse = await apiClient.post("/sessions", {
    email,
    password,
  });
  const { jwt } = createSessionResponse.data;
  return authWithJwt(jwt);
}

export async function authWithJwt(jwt) {
  const response = await apiClient.get("/session", {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  const user = mapUser(response.data.user);

  return { user, jwt };
}
