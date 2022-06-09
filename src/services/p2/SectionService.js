import RestfulService from "./RestfulService";

export default class SectionService extends RestfulService {
  constructor(client, { organizationId, grantId }) {
    super(client, {
      baseUrl: `/organizations/${organizationId}/grants/${grantId}/sections`,
      dto: Section,
    });
  }
}
