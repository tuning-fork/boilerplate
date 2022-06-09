import RestfulService from "./RestfulService";
import Boilerplate from "./dtos/Boilerplate";

export default class BoilerplateService extends RestfulService {
  constructor(client, { organizationId }) {
    super(client, {
      baseUrl: `/organizations/${organizationId}/boilerplates`,
      dto: Boilerplate,
    });
  }
}
