import randomElement from "./randomElement";

describe("randomElement", () => {
  const letters = ["a", "b", "c", "d", "e"];

  it("returns random element in array", () => {
    for (let count = 0; count < 100; count++) {
      const letter = randomElement(letters);
      expect(letters).toContain(letter);
    }
  });

  it("returns the same random element when using same seed", () => {
    for (let count = 0; count < 100; count++) {
      const seed = Math.random();
      const letter1 = randomElement(letters, seed);
      const letter2 = randomElement(letters, seed);
      const letter3 = randomElement(letters, seed);

      expect(letter1).toEqual(letter2);
      expect(letter2).toEqual(letter3);
    }
  });
});
