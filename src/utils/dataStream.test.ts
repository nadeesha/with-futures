import { dataStream } from "./dataStream";

jest.mock("fs", () => ({
  createReadStream: (path) => path,
}));

jest.mock("path", () => ({
  join: (...args) => args,
}));

jest.mock("../config", () => ({
  config: {
    dataDir: "/fake",
  },
}));

it("should create a steeam with given file name", () => {
  const path = "fakepath";
  expect(dataStream(path)).toEqual(["/fake", path]);
});
