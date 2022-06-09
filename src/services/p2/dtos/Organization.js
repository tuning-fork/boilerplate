import Dto from "./Dto";

export default class Organization extends Dto {
  constructor(fields) {
    super(fields);
    this.id = fields.id.toString();
    this.createdAt = new Date(fields.createdAt);
    this.updatedAt = new Date(fields.updatedAt);
    this.name = fields.name;
  }
}
