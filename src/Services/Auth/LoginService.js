import axios from "axios";

export async function login(email, password) {
  const response = await axios({
    method: "post",
    url: "/api/sessions",
    data: { email: email, password: password },
  });
  const { jwt, user_id } = response.data;
  localStorage.setItem("token", jwt);
  localStorage.setItem("user_id", user_id);
  const { data: user } = await axios({
    method: "get",
    url: `/api/users/${user_id}`,
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return { user, jwt };
}

export async function authWithJwt(jwt) {
  const response = await axios({
    method: "get",
    url: "/api/session",
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return response.data;
}
