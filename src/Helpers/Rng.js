/**
 * Seedable random number generator.
 * https://stackoverflow.com/a/424445
 *
 * @example
 * const rng = new RNG(20);
 * for (let i = 0; i < 10; i++) {
 *   console.log(rng.nextRange(10, 50));
 * }
 *
 * const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
 * for (let i = 0; i < 10; i++) {
 *   console.log(rng.choice(digits));
 * }
 */
export class Rng {
  constructor(seed) {
    // LCG using GCC's constants
    this.m = 0x80000000; // 2**31;
    this.a = 1103515245;
    this.c = 12345;
    this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
  }

  nextInt() {
    this.state = (this.a * this.state + this.c) % this.m;
    return this.state;
  }

  /**
   * Generate random number between 0 and 1.
   * @returns {number} Number between 0 and 1.
   */
  nextFloat() {
    return this.nextInt() / (this.m - 1);
  }

  /**
   * Generate random number in provided range.
   * @param {number} start The start of the range.
   * @param {number} end The end of the range.
   * @returns {number} Number between start and end, excluding end.
   */
  nextRange(start, end) {
    // Can't modulo nextInt because of weak randomness in lower bits
    const rangeSize = end - start;
    const randomUnder1 = this.nextInt() / this.m;

    return start + Math.floor(randomUnder1 * rangeSize);
  }

  /**
   * Pick random element from array.
   * @param {T[]} array An array of elements.
   * @returns {T} A random element from the array.
   */
  choice(array) {
    return array[this.nextRange(0, array.length)];
  }
}
