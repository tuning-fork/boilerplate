import axios from "axios";

const mapUser = (apiUser) => ({
  first_name: apiUser.first_name,
  last_name: apiUser.lastName,
  email: email,
  active: true,
  password: password,
  password_confirmation: passwordConfirmation,

  archived: apiGrant.archived,
  createdAt: new Date(apiGrant.created_at),
  deadline: new Date(apiGrant.deadline),
  fundingOrgId: apiGrant.funding_org_id.toString(),
  fundingOrgName: apiGrant.funding_org_name,
  id: apiGrant.id.toString(),
  organizationId: apiGrant.organization_id.toString(),
  purpose: apiGrant.purpose,
  rfpUrl: apiGrant.rfp_url,
  submitted: apiGrant.submitted,
  successful: apiGrant.successful,
  title: apiGrant.title,
  updatedAt: new Date(apiGrant.updated_at),
  sections: apiGrant.sections ? apiGrant.sections.map(mapSection) : [],
});

export const createGrant = (organizationClient, newGrant) => {
  return organizationClient
    .post(`/grants/`, mapGrantToApiGrant(newGrant))
    .then((response) => response.data);
};

export async function signup(email, password) {
  const response = await axios({
    method: "post",
    url: "/api/sessions",
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      active: true,
      password: password,
      password_confirmation: passwordConfirmation,
    },
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
