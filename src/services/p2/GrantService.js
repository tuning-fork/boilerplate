import RestfulService from "./RestfulService";
import Grant from "./dtos/Grant";

export default class GrantService extends RestfulService {
  constructor(client, { organizationId }) {
    super(client, {
      baseUrl: `/organizations/${organizationId}/grants`,
      dto: Grant,
    });
  }

  /**
   * Creates a new grant using the information from the current one
   * @param {string} grantId
   * @param {Record<string, any>} fields
   * @returns {Promise<Grant>}
   */
  async copy(fields) {
    const params = new Grant(fields);
    const response = await this.client.post(
      `${this.baseUrl}/copy`,
      params.serialize()
    );
    const grant = Grant.deserialize(response.data);

    return grant;
  }
}
