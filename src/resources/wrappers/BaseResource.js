import { Resource } from "@rest-hooks/rest";
import { camelCase, snakeCase } from "lodash";
import apiClient from "../../config/apiClient";
import mapKeysDeeply from "../../Helpers/mapKeysDeeply";

export default class BaseResource extends Resource {
  id = undefined;
  createdAt = null;
  updatedAt = null;

  pk() {
    return this.id?.toString();
  }

  static urlRoot = apiClient.defaults.baseURL;

  static schema = {
    createdAt: Date,
    updatedAt: Date,
  };

  // Convert snake_case keys from API to camelCase
  static async fetch(input, init) {
    if (init.body) {
      const camelBody = JSON.parse(init.body);
      const snakeBody = mapKeysDeeply(camelBody, snakeCase);
      init.body = JSON.stringify(snakeBody);
    }
    const jsonResponse = await super.fetch(input, init);
    return mapKeysDeeply(jsonResponse, camelCase);
  }

  // Updates list after creating
  static create() {
    return super.create().extend({
      schema: this,
      update: (newResourceId) => ({
        [this.list().key({})]: (resourceIds = []) => [
          ...resourceIds,
          newResourceId,
        ],
      }),
    });
  }
}
