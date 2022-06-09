import RestfulService from "./RestfulService";
import Category from "./dtos/Category";

export default class CategoryService extends RestfulService {
  constructor(client, { organizationId }) {
    super(client, {
      baseUrl: `/organizations/${organizationId}/categories`,
      dto: Category,
    });
  }
}
