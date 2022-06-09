import SignupParams from "./dtos/SignupParams";
import User from "./dtos/User";

export default class AuthService {
  constructor(client) {
    this.client = client;
  }

  /**
   * Creates a new account for a user.
   * @param {Record<string, any>} fields
   * @returns {Promise<User>}
   */
  async signup(fields) {
    const signupParams = new SignupParams(fields);
    const response = await this.client.post("/users", signupParams.serialize());
    const user = User.deserialize(response.data);

    return user;
  }

  /**
   * Creates a new login session for a user using email/password.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{ user: User, jwt: string }>}
   */
  async createSession(email, password) {
    const params = { email, password };
    const response = await this.client.post("/sessions", params);
    const session = await this.fetchSession(response.data.jwt);

    return session;
  }

  /**
   * Fetches the current login session given a jwt token.
   * @param {string} jwt
   * @returns {Promise<{ user: User, jwt: string }>}
   */
  async fetchSession(jwt) {
    const response = await this.client.get("/session", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    const user = User.deserialize(response.data.user);

    return { user, jwt };
  }
}
