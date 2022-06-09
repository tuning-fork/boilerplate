import Dto from "./Dto"

export default class Grant extends Dto {
  constructor(fields) {
    super(fields)
    this.id = fields.id.toString()
    this.createdAt = new Date(fields.createdAt)
    this.updatedAt = new Date(fields.updatedAt)
    this.archived = fields.archived
    this.deadline = new Date(fields.deadline)
    this.purpose = fields.purpose
    this.rfpUrl = fields.rfp_url
    this.submitted = fields.submitted
    this.successful = fields.successful
    this.title = fields.title

    // this.fundingOrgId = fields.funding_org_id.toString()
    // this.fundingOrgName = fields.funding_org_name
    // this.organizationId = fields.organization_id.toString()
    // this.sections = fields.sections ? fields.sections.map(mapSection) : []
  }
}
