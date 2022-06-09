import RestfulService from "./RestService";
import Organization from "./dtos/Organization";

export default class OrganizationService extends RestfulService {
  constructor(client) {
    super(client, {
      baseUrl: "/organizations",
      dto: Organization,
    });
  }
}
