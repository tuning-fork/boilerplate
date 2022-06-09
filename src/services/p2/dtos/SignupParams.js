import Dto from "./Dto";

export default class SignupParams extends Dto {
  constructor(fields) {
    super(fields);
    this.firstName = fields.firstName;
    this.lastName = fields.lastName;
    this.email = fields.email;
    this.active = fields.active;
    this.password = fields.password;
    this.passwordConfirmation = fields.passwordConfirmation;
  }
}
