import AuthenticatedResource from "./wrappers/AuthenticatedResource";

export default class Organization extends AuthenticatedResource {
  id = undefined;
  name = "";
  createdAt = null;
  updatedAt = null;

  static urlRoot = "/api/organizations";
}
