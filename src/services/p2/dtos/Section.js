import Dto from "./Dto";

export default class Section extends Dto {
  constructor(fields) {
    super(fields);
    this.id = fields.id.toString();
    this.createdAt = new Date(fields.createdAt);
    this.updatedAt = new Date(fields.updatedAt);
    this.wordCount = fields.wordcount;
    this.title = fields.title;
    this.text = fields.text;
    this.sortOrder = fields.sortOrder;
  }
}
