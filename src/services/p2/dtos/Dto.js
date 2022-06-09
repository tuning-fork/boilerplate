import camelCase from "lodash.camelcase";
import snakeCase from "lodash.snakecase";

export default class Dto {
  constructor(fields) {
    this._fields = fields;
  }

  serialize() {
    return Object.entries(this._fields).reduce(
      (serializedObject, [key, value]) => {
        const snakeCasedKey = snakeCase(key);
        serializedObject[snakeCasedKey] = value;
        return serializedObject;
      },
      {}
    );
  }

  static deserialize(fields) {
    const deserializedFields = Object.entries(fields).reduce(
      (deserializedObject, [key, value]) => {
        const camelCasedKey = camelCase(key);
        deserializedObject[camelCasedKey] = value;
        return deserializedObject;
      },
      {}
    );

    return new this(deserializedFields);
  }
}
