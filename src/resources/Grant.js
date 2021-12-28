import OrganizationResource from "./wrappers/OrganizationResource";

export default class Grant extends OrganizationResource {
  archived = false;
  deadline = null;
  fundingOrgId = undefined;
  organizationId = undefined;
  purpose = "";
  rfpUrl = "";
  submitted = false;
  successful = false;
  title = "";

  static schema = {
    ...OrganizationResource.schema,
    deadline: Date,
    organizationId: String,
    fundingOrgId: String,
  };

  static urlRoot = "/grants";
}
