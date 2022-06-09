import RestfulService from "./RestfulService";
import ReportSection from "./dtos/ReportSection";

export default class ReportSectionService extends RestfulService {
  constructor(client, { organizationId, grantId, reportId }) {
    super(client, {
      baseUrl: `/organizations/${organizationId}/grants/${grantId}/reports/${reportId}/sections`,
      dto: ReportSection,
    });
  }
}
