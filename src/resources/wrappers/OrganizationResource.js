import AuthenticatedResource from "./AuthenticatedResource";

export default class OrganizationResource extends AuthenticatedResource {
  static url({ organizationId }) {
    return (
      AuthenticatedResource.urlRoot +
      `/organizations/${organizationId}${this.urlRoot}/${this.pk()}`
    );
  }

  static listUrl({ organizationId }) {
    return (
      AuthenticatedResource.urlRoot +
      `/organizations/${organizationId}${this.urlRoot}`
    );
  }
}
