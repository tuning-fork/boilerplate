import CamelCaseResource from "./CamelCaseResource";

export default class Organization extends CamelCaseResource {
  id = undefined;
  name = "";
  createdAt = null;
  updatedAt = null;

  pk() {
    return this.id?.toString();
  }

  static useFetchInit = (init) => {
    const accessToken = localStorage.getItem("token");
    return {
      ...init,
      headers: {
        ...init.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };
  };

  static urlRoot = "http://localhost:3000/api/organizations";
}
