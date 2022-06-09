import Report from "./dtos/Report";

export default class ReportService {
  constructor(client, organizationId, grantId, reportId) {
    this.client = client
    this.baseUrl = `/organizations/${organizationId}/grants/${grantId}/reports/${reportId}`
  }

  /**
   * Loads the report
   * @param {string} reportId
   * @returns {Promise<Report>}
   */
  async get() {
    const response = await this.client.get(this.baseUrl)
    const report = Report.deserialize(response.data)

    return report
  }

  /**
   * Deletes the report
   * @param {string} reportId
   * @returns {Promise<Report>}
   */
  async delete() {
    const response = await this.client.delete(this.baseUrl)
    const report = Report.deserialize(response.data);

    return report
  }

  /**
   * Updates the information on the report
   * @param {string} reportId
   * @param {Record<string, any>} fields
   * @returns {Promise<Report>}
   */
  async update(fields) {
    const params = new Report(fields)
    const response = await this.client.patch(this.baseUrl, params.serialize())
    const report = Report.deserialize(response.data);

    return report
  }

  /**
   * Fetches all the sections in the report
   * @returns {Promise<ReportSection[]>}
   */
  async listSections() {
    const response = await this.client.get(`${this.baseUrl}/sections`)
    const sections = response.data.map(ReportSection.deserialize)

    return sections
  }

  /**
   * Creates a new section in the report
   * @param {Record<string, any>} fields
   * @returns {Promise<ReportSection>}
   */
  async createSection(fields) {
    const params = new ReportSection(fields)
    const response = await this.client.post(`${this.baseUrl}/sections`, params.serialize())
    const section = ReportSection.deserialize(response.data);

    return section
  }

  /**
   * Loads a section in the report
   * @param {string} sectionId
   * @returns {Promise<ReportSection>}
   */
  async getSection(sectionId) {
    const response = await this.client.get(`${this.baseUrl}/sections/${sectionId}`)
    const section = ReportSection.deserialize(response.data)

    return section
  }

  /**
   * Deletes a section
   * @param {string} sectionId
   * @returns {Promise<ReportSection>}
   */
  async deleteSection(sectionId) {
    const response = await this.client.delete(`${this.baseUrl}/sections/${sectionId}`)
    const section = ReportSection.deserialize(response.data);

    return section
  }

  /**
   * Updates the information on a section
   * @param {string} sectionId
   * @param {Record<string, any>} fields
   * @returns {Promise<ReportSection>}
   */
  async updateSection(sectionId, fields) {
    const params = new Section(fields)
    const response = await this.client.patch(`${this.baseUrl}/sections/${sectionId}`, params.serialize())
    const section = ReportSection.deserialize(response.data);

    return section
  }
}
