import Dto from "./Dto"

export default class Category extends Dto {
  constructor(fields) {
    super(fields)
    this.id = fields.id.toString()
    this.createdAt = new Date(fields.createdAt)
    this.updatedAt = new Date(fields.updatedAt)
    this.name = fields.name
    this.archived = fields.archived
    // this.organizationId = fields.organization_id.toString()
  }
}