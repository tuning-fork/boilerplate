import Dto from "./Dto"

export default class User extends Dto {
  constructor(fields) {
    super(fields)
    this.id = fields.id.toString()
    this.createdAt = new Date(fields.createdAt)
    this.updatedAt = new Date(fields.updatedAt)
    this.firstName = fields.firstName
    this.lastName = fields.lastName
    this.email = fields.email
    this.active = fields.active
  }
}
