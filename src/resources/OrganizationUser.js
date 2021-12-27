import OrganizationResource from "./wrappers/OrganizationResource";

export default class OrganizationUser extends OrganizationResource {
  email = "";
  firstName = "";
  lastName = "";

  static urlRoot = "/users";
}
