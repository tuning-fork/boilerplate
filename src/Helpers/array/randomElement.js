import rng from "seedrandom";

/**
 * Generate a random number between start and end, inclusive
 */
function randomNumber({ start, end, seed }) {
  const generator = rng(seed);
  return Math.floor(generator() * (end - start + 1) + start);
}

/**
 * Returns a random element from provided array
 * @param {T[]} array An array elements to choose from
 * @param {number} [seed] The seed to use
 * @returns {T} An element from the array
 */
export default function randomElement(array, seed) {
  const index = randomNumber({ seed, start: 0, end: array.length - 1 });
  return array[index];
}
