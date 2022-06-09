import RestfulService from "./RestfulService";
import Grant from "./dtos/Grant";

export default class GrantService extends RestfulService {
  constructor(client, { organizationId }) {
    super(client, {
      baseUrl: `/organizations/${organizationId}/grants`,
      dto: Grant,
    });
  }
}
