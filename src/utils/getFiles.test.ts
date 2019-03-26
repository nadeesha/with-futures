import { getFiles } from "./getFiles";

jest.mock("fs", () => ({
  readdir: (path, encoding, done) =>
    done(null, ["test.txt", "test.json", "nonjson"]),
}));

it("should only get json files", () => {
  return getFiles("fakepath")
    .promise()
    .then((results) => expect(results).toEqual(["test.json"]));
});
