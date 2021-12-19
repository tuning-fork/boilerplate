import countSectionWords from "./countSectionWords";

describe("countSectionWords", () => {
  it("returns the sum of title and text word counts", () => {
    expect(
      countSectionWords({
        title: "Hello!",
        wordCount: 100,
      })
    ).toEqual(101);
    expect(
      countSectionWords({
        title: "Lorem Ipsum",
        wordCount: 38,
      })
    ).toEqual(40);
  });

  it("returns zero when title and text are both zero", () => {
    expect(
      countSectionWords({
        title: "",
        wordCount: 0,
      })
    ).toEqual(0);
  });
});
