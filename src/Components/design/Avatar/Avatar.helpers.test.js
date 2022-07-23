const { randomColor } = require("./Avatar.helpers");

describe("Avatar Helpers", () => {
  describe("randomColor", () => {
    it("returns the same color given the same string", () => {
      const colorFoo1 = randomColor("foo");
      const colorFoo2 = randomColor("foo");
      const colorFoo3 = randomColor("foo");

      expect(colorFoo1).toEqual(colorFoo2);
      expect(colorFoo2).toEqual(colorFoo3);

      const colorBar1 = randomColor("bar");
      const colorBar2 = randomColor("bar");
      const colorBar3 = randomColor("bar");

      expect(colorBar1).toEqual(colorBar2);
      expect(colorBar2).toEqual(colorBar3);
    });
  });
});
