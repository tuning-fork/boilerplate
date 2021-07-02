/**
 * Recursively maps all keys in object using mapper
 * @param {object} object Object to map
 * @param {(key: string) => string} mapper Function used to map keys
 * @returns Mapped object
 */
export default function mapKeysDeeply(object, mapper) {
  return Object.keys(object).reduce(
    (mappedObject, key) => {
      if (object[key] !== null && typeof object[key] === "object") {
        mappedObject[mapper(key)] = mapKeysDeeply(object[key], mapper);
      } else {
        mappedObject[mapper(key)] = object[key];
      }
      return mappedObject;
    },
    Array.isArray(object) ? [] : {}
  );
}
