import { createMockWritableStream } from "./../test/utils/streams";
import { createMockReadableStream } from "../test/utils/streams";
import { fp } from "../utils/fp";
import * as searchStreamModule from "./searchStream";
import { searchNode, searchStream } from "./searchStream";

describe("searchNode", () => {
  it("should be able to search with regex", () => {
    const node = "foo";
    const regex = new RegExp("match[0-9]");

    const search = searchNode(node, regex);

    const tests = [
      {
        data: {
          bar: "none"
        },
        match: false
      },
      {
        data: {
          foo: "matchx"
        },
        match: false
      },
      {
        data: {
          foo: "match1"
        },
        match: true
      },
      {
        data: {
          foo: ["nomatch", "match2"]
        },
        match: true
      }
    ].forEach(test => {
      const data = { value: test.data };
      expect(search(data)).toBe(test.match ? data : null);
    });
  });
});

describe("searchStream", () => {
  it("should be able handle a stream and call search fn", () => {
    const readable = createMockReadableStream();
    const writable = createMockWritableStream();

    const mockNode = "foo";
    const mockTerm = "bar";

    const mockData = [
      {
        foo: 1
      },
      {
        foo: 2
      },
      {
        foo: 3
      }
    ];

    const mockSearchNodeFn = jest.fn().mockImplementation(() => fp.identity);

    searchStream(readable, mockNode, mockTerm, writable, mockSearchNodeFn)
      .promise()
      .then(result => {
        expect(mockSearchNodeFn).toHaveBeenCalledTimes(1);
        expect(result.count).toBe(mockData.length);
      });

    readable.emit("data", JSON.stringify(mockData));
    readable.emit("end");
  });

  it("should be able handle a stream error", () => {
    const readable = createMockReadableStream();
    const writable = createMockWritableStream();

    const mockNode = "foo";
    const mockTerm = "bar";

    const mockError = "malformedxx";

    const mockSearchNodeFn = jest.fn().mockImplementation(() => fp.identity);

    searchStream(readable, mockNode, mockTerm, writable, mockSearchNodeFn)
      .promise()
      .catch(error => {
        expect(error.message).toBe(mockError);
      });

    readable.emit("data", "foobar");
    readable.emit("error", new Error(mockError));
    readable.emit("end");
  });
});
