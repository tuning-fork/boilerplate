import { camelCase, snakeCase } from "lodash";
import { Resource } from "@rest-hooks/rest";

function deeplyApplyKeyTransform(obj, transform) {
  const ret = Array.isArray(obj) ? [] : {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] != null && typeof obj[key] === "object") {
      ret[transform(key)] = deeplyApplyKeyTransform(obj[key], transform);
    } else {
      ret[transform(key)] = obj[key];
    }
  });
  return ret;
}

/**
 * Wrapper around resource to convert snake_case keys from API to camelCase
 */
export default class CamelCaseResource extends Resource {
  static async fetch(input, init) {
    if (init.body) {
      init.body = deeplyApplyKeyTransform(init.body, snakeCase);
    }
    const jsonResponse = await super.fetch(input, init);
    return deeplyApplyKeyTransform(jsonResponse, camelCase);
  }
}
