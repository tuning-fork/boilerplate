import Grant from "./dtos/Grant";
import Section from "./dtos/Section";
import Report from "./dtos/Report";

export default class GrantService {
  constructor(client, organizationId, grantId) {
    this.client = client
    this.baseUrl = `/organizations/${organizationId}/grants/${grantId}`
  }

  /**
   * Loads the grant
   * @param {string} grantId
   * @returns {Promise<Grant>}
   */
  async get() {
    const response = await this.client.get(this.baseUrl)
    const grant = Grant.deserialize(response.data)

    return grant
  }

  /**
   * Deletes the grant
   * @param {string} grantId
   * @returns {Promise<Grant>}
   */
  async delete() {
    const response = await this.client.delete(this.baseUrl)
    const grant = Grant.deserialize(response.data);

    return grant
  }

  /**
   * Updates the information on the grant
   * @param {string} grantId
   * @param {Record<string, any>} fields
   * @returns {Promise<Grant>}
   */
  async update(fields) {
    const params = new Grant(fields)
    const response = await this.client.patch(this.baseUrl, params.serialize())
    const grant = Grant.deserialize(response.data);

    return grant
  }

  /**
   * Creates a new grant using the information from the current one
   * @param {string} grantId
   * @param {Record<string, any>} fields
   * @returns {Promise<Grant>}
   */
  async copy(fields) {
    const params = new Grant(fields)
    const response = await this.client.post(`${this.baseUrl}/copy`, params.serialize())
    const grant = Grant.deserialize(response.data);

    return grant
  }

  /**
   * Fetches all the sections in the grant
   * @returns {Promise<Section[]>}
   */
  async listSections() {
    const response = await this.client.get(`${this.baseUrl}/sections`)
    const sections = response.data.map(Section.deserialize)

    return sections
  }

  /**
   * Creates a new section in the grant
   * @param {Record<string, any>} fields
   * @returns {Promise<Section>}
   */
  async createSection(fields) {
    const params = new Section(fields)
    const response = await this.client.post(`${this.baseUrl}/sections`, params.serialize())
    const section = Section.deserialize(response.data);

    return section
  }

  /**
   * Loads a section in the grant
   * @param {string} sectionId
   * @returns {Promise<Section>}
   */
  async getSection(sectionId) {
    const response = await this.client.get(`${this.baseUrl}/sections/${sectionId}`)
    const section = Section.deserialize(response.data)

    return section
  }

  /**
   * Deletes a section
   * @param {string} sectionId
   * @returns {Promise<Section>}
   */
  async deleteSection(sectionId) {
    const response = await this.client.delete(`${this.baseUrl}/sections/${sectionId}`)
    const section = Section.deserialize(response.data);

    return section
  }

  /**
   * Updates the information on a section
   * @param {string} sectionId
   * @param {Record<string, any>} fields
   * @returns {Promise<Section>}
   */
  async updateSection(sectionId, fields) {
    const params = new Section(fields)
    const response = await this.client.patch(`${this.baseUrl}/sections/${sectionId}`, params.serialize())
    const section = Section.deserialize(response.data);

    return section
  }

  /**
   * Changes the order of a section in the grant
   * @param {string} sectionId
   * @param {Record<string, any>} fields
   * @returns {Promise<Section>}
   */
  async reorderSection(sectionId, sortOrder) {
    const params = { sort_order: sortOrder }
    const response = await this.client.patch(`/actions/reorder_section/${sectionId}`, params)
    const section = Section.deserialize(response.data);

    return section
  }

  /**
   * Fetches all the reports in the grant
   * @returns {Promise<Report[]>}
   */
  async listReports() {
    const response = await this.client.get(`${this.baseUrl}/reports`)
    const reports = response.data.map(Report.deserialize)

    return reports
  }

  /**
   * Creates a new report in the grant
   * @param {Record<string, any>} fields
   * @returns {Promise<Section>}
   */
  async createReport(fields) {
    const params = new Report(fields)
    const response = await this.client.post(`${this.baseUrl}/reports`, params.serialize())
    const report = Report.deserialize(response.data);

    return report
  }
}
