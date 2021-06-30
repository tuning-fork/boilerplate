import { Resource } from "@rest-hooks/rest";
import { camelCase, snakeCase } from "lodash";
import mapKeysDeeply from "../../Helpers/mapKeysDeeply";

export default class BaseResource extends Resource {
  id = undefined;

  pk() {
    return this.id?.toString();
  }

  static schema = {
    createdAt: Date,
    updatedAt: Date,
  };

  // Convert snake_case keys from API to camelCase
  static async fetch(input, init) {
    if (init.body) {
      init.body = mapKeysDeeply(init.body, snakeCase);
    }
    const jsonResponse = await super.fetch(input, init);
    return mapKeysDeeply(jsonResponse, camelCase);
  }
}
