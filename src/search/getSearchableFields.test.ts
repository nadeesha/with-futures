import { createMockStream } from "./../test/utils/streams";
import { fp } from "./../utils/fp";
import { getSearchableFields } from "./getSearchableFields";

it("should get the top level fields of the json being streamed", () => {
  const mockStream = createMockStream();

  const mockData = {
    bar: "baz",
    foo: "bar"
  };

  getSearchableFields(mockStream)
    .promise()
    .then(resut => expect(resut).toEqual(fp.keys(mockData)));
});

it("should error out for malformed streams", () => {
  const mockStream = createMockStream();

  getSearchableFields(mockStream)
    .promise()
    .catch(error => expect(error.message).toMatch(/Parser cannot parse/));

  mockStream.emit("data", "malformedxxx");
  mockStream.emit("end");
});

it("should error out for error events", () => {
  const mockStream = createMockStream();

  const errorMessage = "foo";

  getSearchableFields(mockStream)
    .promise()
    .catch(error => expect(error.message).toBe(errorMessage));

  mockStream.emit("data", "malformedxxx");
  mockStream.emit("error", new Error("foo"));
});
