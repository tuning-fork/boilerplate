import AuthenticatedResource from "./AuthenticatedResource";

export default class OrganizationResource extends AuthenticatedResource {
  static url({ organizationUuid }) {
    return (
      AuthenticatedResource.urlRoot +
      `/organizations/${organizationUuid}${this.urlRoot}/${this.pk()}`
    );
  }

  static listUrl({ organizationUuid }) {
    return (
      AuthenticatedResource.urlRoot +
      `/organizations/${organizationUuid}${this.urlRoot}`
    );
  }
}
