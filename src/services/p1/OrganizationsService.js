import Organization from "./dtos/Organization"

export default class OrganizationService {
  constructor(client) {
    this.client = client
  }

  /**
   * Fetches all the organizations the user is in.
   * @returns {Promise<Organization[]>}
   */
  async listOrganizations() {
    const response = await this.client.get('/organizations')
    const organizations = response.data.map(Organization.deserialize)

    return organizations
  }
}
