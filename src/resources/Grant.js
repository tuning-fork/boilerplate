import OrganizationResource from "./wrappers/OrganizationResource";

export default class Grant extends OrganizationResource {
  archived = false;
  deadline = null;
  fundingOrgId = undefined;
  organizationUuid = undefined;
  purpose = "";
  rfpUrl = "";
  submitted = false;
  successful = false;
  title = "";

  static schema = {
    ...OrganizationResource.schema,
    deadline: Date,
    organizationUuid: String,
    fundingOrgId: String,
  };

  static urlRoot = "/grants";
}
