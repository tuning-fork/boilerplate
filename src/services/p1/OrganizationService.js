import Boilerplate from "./dtos/Boilerplate";
import Grant from "./dtos/Grant";
import Organization from "./dtos/Organization";

export default class OrganizationService {
  constructor(client, organizationId) {
    this.client = client;
    this.baseUrl = `/organizations/${organizationId}`;
  }

  /**
   * Loads the organization
   * @returns {Promise<Organization>}
   */
  async get() {
    const response = await this.client.get(this.baseUrl);
    const organization = Organization.deserialize(response.data);

    return organization;
  }

  /**
   * Fetches all the users in the organization
   * @returns {Promise<User[]>}
   */
  async listUsers() {
    const response = await this.client.get(`${this.baseUrl}/users`);
    const users = response.data.map(User.deserialize);

    return users;
  }

  /**
   * Fetches all the grants in the organization
   * @returns {Promise<Grant[]>}
   */
  async listGrants() {
    const response = await this.client.get(`${this.baseUrl}/grants`);
    const grants = response.data.map(Grant.deserialize);

    return grants;
  }

  /**
   * Fetches all the boilerplates in the organization
   * @returns {Promise<Boilerplate[]>}
   */
  async listBoilerplates() {
    const response = await this.client.get(`${this.baseUrl}/boilerplates`);
    const boilerplates = response.data.map(Boilerplate.deserialize);

    return boilerplates;
  }

  /**
   * Creates a new boilerplate for the organization
   * @param {Record<string, any>} fields
   * @returns {Promise<Boilerplate>}
   */
  async createBoilerplate(fields) {
    const params = new Boilerplate(fields);
    const response = await this.client.post(
      `${this.baseUrl}/boilerplates`,
      params.serialize()
    );
    const boilerplate = Boilerplate.deserialize(response.data);

    return boilerplate;
  }

  /**
   * Loads a boilerplate
   * @param {string} boilerplateId
   * @returns {Promise<Boilerplate>}
   */
  async getBoilerplate(boilerplateId) {
    const response = await this.client.get(
      `${this.baseUrl}/boilerplates/${boilerplateId}`
    );
    const boilerplate = Boilerplate.deserialize(mapBoilerplate(response.data));

    return boilerplate;
  }

  /**
   * Deletes a boilerplate
   * @param {string} boilerplateId
   * @returns {Promise<Boilerplate>}
   */
  async deleteBoilerplate(boilerplateId) {
    const response = await this.client.delete(
      `${this.baseUrl}/boilerplates/${boilerplateId}`
    );
    const boilerplate = Boilerplate.deserialize(response.data);

    return boilerplate;
  }

  /**
   * Updates the information on a boilerplate
   * @param {string} boilerplateId
   * @param {Record<string, any>} fields
   * @returns {Promise<Boilerplate>}
   */
  async updateBoilerplate(boilerplateId, fields) {
    const params = new Boilerplate(fields);
    const response = await this.client.patch(
      `${this.baseUrl}/boilerplates/${boilerplateId}`,
      params.serialize()
    );
    const boilerplate = Boilerplate.deserialize(response.data);

    return boilerplate;
  }

  /**
   * Fetches all the funding orgs in the organization
   * @param {string} fundingOrgId
   * @returns {Promise<FundingOrg[]>}
   */
  async listFundingOrgs() {
    const response = await this.client.get(`${this.baseUrl}/funding_orgs`);
    const fundingOrgs = response.data.map(FundingOrg.deserialize);

    return fundingOrgs;
  }

  /**
   * Creates a new funding org for the organization
   * @param {Record<string, any>} fields
   * @returns {Promise<FundingOrg>}
   */
  async createFundingOrg(fields) {
    const params = new FundingOrg(fields);
    const response = await this.client.post(
      `${this.baseUrl}/funding_orgs`,
      params.serialize()
    );
    const fundingOrg = FundingOrg.deserialize(response.data);

    return fundingOrg;
  }

  /**
   * Loads a funding org
   * @param {string} fundingOrgId
   * @returns {Promise<FundingOrg>}
   */
  async getFundingOrg(fundingOrgId) {
    const response = await this.client.get(
      `${this.baseUrl}/funding_orgs/${fundingOrgId}`
    );
    const fundingOrg = FundingOrg.deserialize(mapFundingOrg(response.data));

    return fundingOrg;
  }

  /**
   * Deletes a funding org
   * @param {string} fundingOrgId
   * @returns {Promise<FundingOrg>}
   */
  async deleteFundingOrg(fundingOrgId) {
    const response = await this.client.delete(
      `${this.baseUrl}/funding_orgs/${fundingOrgId}`
    );
    const fundingOrg = FundingOrg.deserialize(response.data);

    return fundingOrg;
  }

  /**
   * Updates the information on a funding org
   * @param {string} fundingOrgId
   * @param {Record<string, any>} fields
   * @returns {Promise<FundingOrg>}
   */
  async updateFundingOrg(fundingOrgId, fields) {
    const params = new FundingOrg(fields);
    const response = await this.client.patch(
      `${this.baseUrl}/funding_orgs/${fundingOrgId}`,
      params.serialize()
    );
    const fundingOrg = FundingOrg.deserialize(response.data);

    return fundingOrg;
  }

  /**
   * Fetches all the categories in the organization
   * @param {string} categoryId
   * @returns {Promise<Category[]>}
   */
  async listCategories() {
    const response = await this.client.get(`${this.baseUrl}/categories`);
    const categories = response.data.map(Category.deserialize);

    return categories;
  }

  /**
   * Creates a new category for the organization
   * @param {Record<string, any>} fields
   * @returns {Promise<Category>}
   */
  async createCategory(fields) {
    const params = new Category(fields);
    const response = await this.client.post(
      `${this.baseUrl}/categories`,
      params.serialize()
    );
    const category = Category.deserialize(response.data);

    return category;
  }

  /**
   * Loads a category
   * @param {string} categoryId
   * @returns {Promise<Category>}
   */
  async getCategory(categoryId) {
    const response = await this.client.get(
      `${this.baseUrl}/categories/${categoryId}`
    );
    const category = Category.deserialize(mapCategory(response.data));

    return category;
  }

  /**
   * Deletes a category
   * @param {string} categoryId
   * @returns {Promise<Category>}
   */
  async deleteCategory(categoryId) {
    const response = await this.client.delete(
      `${this.baseUrl}/categories/${categoryId}`
    );
    const category = Category.deserialize(response.data);

    return category;
  }

  /**
   * Updates the information on a category
   * @param {string} categoryId
   * @param {Record<string, any>} fields
   * @returns {Promise<Category>}
   */
  async updateCategory(categoryId, fields) {
    const params = new Category(fields);
    const response = await this.client.patch(
      `${this.baseUrl}/categories/${categoryId}`,
      params.serialize()
    );
    const category = Category.deserialize(response.data);

    return category;
  }
}
