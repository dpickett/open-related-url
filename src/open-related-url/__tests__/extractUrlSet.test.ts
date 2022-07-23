import { extractUrlSet } from "../extractUrlSet";
describe("extracting a url set", () => {
  const requiredParams = {
    position: {
      start: { line: 0, col: 0, offset: 0 },
      end: { line: 0, col: 0, offset: 0 },
    },
  };
  it("returns an empty object with no Url suffixes", () => {
    const results = extractUrlSet({
      ...requiredParams,
      example: "is blank",
    });
    expect(Object.keys(results).length).toEqual(0);
  });

  it("returns google when googleUrl is found", () => {
    const googleUrl = "https://google.com";
    const results = extractUrlSet({
      ...requiredParams,
      googleUrl,
    });

    expect(results[0].name).toEqual("google");
    expect(results[0].url).toEqual(googleUrl);
  });
});
