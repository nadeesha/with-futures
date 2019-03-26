import { state } from "./application";

describe("application state", () => {
  it("should initialize properly", () => {
    expect(state(undefined, {})).toMatchInlineSnapshot(`
Object {
  "config": Object {
    "dataDir": "/Users/nadeeshacabral/ccc/data",
  },
  "field": "",
  "file": "",
  "filesList": Array [],
  "results": Array [],
  "stream": null,
  "term": "",
}
`);
  });

  it("should update existing keys", () => {
    const prev = state(undefined, {
      field: "bar1",
      filesList: ["baz1", "baz1"]
    });

    const newField = "bar2";

    expect(state(prev, { field: newField }).field).toBe(newField);
  });

  it("should not change non-updated keys", () => {
    const prev = state(undefined, {
      field: "bar1",
      term: "term1"
    });

    expect(state(prev, { field: "bar2" }).term).toBe(prev.term);
  });
});
