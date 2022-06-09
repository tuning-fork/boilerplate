import Dto from "./Dto";

export default class Report extends Dto {
  constructor(fields) {
    super(fields);
    this.id = fields.id.toString();
    this.createdAt = new Date(fields.createdAt);
    this.updatedAt = new Date(fields.updatedAt);
    this.deadline = new Date(fields.deadline);
    this.archived = fields.archived;
    this.submitted = fields.submitted;
    this.title = fields.title;

    // this.fundingOrgId = fields.grant.funding_org_id.toString()
    // this.fundingOrgName = fields.grant.funding_org_name
    // this.organizationId = fields.grant.organization_id.toString()
    // this.reportSections = fields.report_sections
    //   this.? =fields.report_sections.map(mapReportSection)
    //   : []
  }
}
