import RestfulService from "./RestfulService";
import FundingOrg from "./dtos/FundingOrg";

export default class FundingOrgService extends RestfulService {
  constructor(client, { organizationId }) {
    super(client, {
      baseUrl: `/organizations/${organizationId}/funding_orgs`,
      dto: FundingOrg,
    });
  }
}
