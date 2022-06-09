import Dto from "./Dto"

export default class Boilerplate extends Dto {
  constructor(fields) {
    super(fields)
    this.id = fields.id.toString()
    this.createdAt = new Date(fields.createdAt)
    this.updatedAt = new Date(fields.updatedAt)
    this.archived = fields.archived
    this.title = fields.title
    this.text = fields.text
    this.wordcount = fields.wordcount

    // this.categoryId = fields.category_id.toString()
    // this.categoryName = fields.category_name
    // this.organizationId = fields.organization_id.toString()
  }
}
