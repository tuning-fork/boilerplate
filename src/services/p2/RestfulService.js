export default class RestfulService {
  /**
   * @param {import('axios').AxiosInstance} client
   * @param {object} config
   * @param {string} config.baseUrl
   * @param {typeof import('./dtos/Dto').default} config.dto
   */
  constructor(client, config) {
    this.client = client;
    this.dto = config.dto;
    this.baseUrl = config.baseUrl;
  }

  async list() {
    const response = await this.client.get(this.baseUrl);
    const organization = this.dto.deserialize(response.data);

    return organization;
  }

  async create(fields) {
    const params = new this.dto(fields);
    const response = await this.client.post(this.baseUrl, params.serialize());
    const organization = this.dto.deserialize(response.data);

    return organization;
  }

  async get(id) {
    const response = await this.client.get(`${this.baseUrl}/${id}`);
    const organization = this.dto.deserialize(response.data);

    return organization;
  }

  async update(id, fields) {
    const params = new this.dto(fields);
    const response = await this.client.patch(
      `${this.baseUrl}/${id}`,
      params.serialize()
    );
    const organization = this.dto.deserialize(response.data);

    return organization;
  }

  async delete(id) {
    const response = await this.client.delete(`${this.baseUrl}/${id}`);
    const organization = this.dto.deserialize(response.data);

    return organization;
  }
}
