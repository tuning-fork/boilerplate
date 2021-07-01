import AuthenticatedResource from "./wrappers/AuthenticatedResource";

export default class Organization extends AuthenticatedResource {
  name = "";

  static urlRoot = "/api/organizations";
}
