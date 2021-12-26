import { useCurrentUser } from "../../Contexts/currentUserContext";
import BaseResource from "./BaseResource";

function useFetchInit(init) {
  const { jwt } = useCurrentUser();

  return {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${jwt}`,
    },
  };
}

export default class AuthenticatedResource extends BaseResource {
  static useFetchInit = useFetchInit;
}
