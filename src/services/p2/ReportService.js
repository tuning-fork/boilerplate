import RestfulService from "./RestfulService";
import Report from "./dtos/Report";

export default class ReportService extends RestfulService {
  constructor(client, { organizationId, grantId }) {
    super(client, {
      baseUrl: `/organizations/${organizationId}/grants/${grantId}/reports`,
      dto: Report,
    });
  }
}
