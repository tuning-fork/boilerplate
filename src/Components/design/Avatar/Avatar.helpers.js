import randomElement from "../../../Helpers/array/randomElement";

const AVATAR_BACKGROUND_COLORS = ["#DF0B92", "#097FAA", "#AD6200", "#084391"];

/**
 * Returns a random, deterministic hex color value given a string.
 * @param {string} string The string
 * @returns {string} A hex color
 */
export function randomColor(string) {
  const seed = string
    .split("")
    .reduce((seed, char) => seed + char.charCodeAt(0), 0);
  const backgroundColor = randomElement(AVATAR_BACKGROUND_COLORS, seed);

  return backgroundColor;
}

/**
 * Returns true if the given parameter is an array of strings and false if not.
 * @param {any} array
 * @returns {boolean}
 */
export function isArrayOfStrings(array) {
  if (!Array.isArray(array)) {
    return false;
  }
  return array.every((element) => typeof element === "string");
}
