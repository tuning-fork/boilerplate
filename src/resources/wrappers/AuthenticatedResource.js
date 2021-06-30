import BaseResource from "./BaseResource";

export default class AuthenticatedResource extends BaseResource {
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
}
