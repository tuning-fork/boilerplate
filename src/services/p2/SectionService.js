import RestfulService from "./RestfulService";
import Section from "./dtos/Section";

export default class SectionService extends RestfulService {
  constructor(client, { organizationId, grantId }) {
    super(client, {
      baseUrl: `/organizations/${organizationId}/grants/${grantId}/sections`,
      dto: Section,
    });
  }

  /**
   * Changes the order of a section in the grant
   * @param {string} sectionId
   * @param {Record<string, any>} fields
   * @returns {Promise<Section>}
   */
  async reorderSection(sectionId, sortOrder) {
    const params = { sort_order: sortOrder };
    const response = await this.client.patch(
      `/actions/reorder_section/${sectionId}`,
      params
    );
    const section = Section.deserialize(response.data);

    return section;
  }
}
