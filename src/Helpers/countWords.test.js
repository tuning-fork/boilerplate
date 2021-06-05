import countWords from "./countWords";

describe("countWords", () => {
  it("returns the number of words in a given string", () => {
    expect(countWords("Hello!")).toEqual(1);
    expect(countWords("Lorem Ipsum.")).toEqual(2);
  });

  it("returns zero given empty string", () => {
    expect(countWords("")).toEqual(0);
  });
});
