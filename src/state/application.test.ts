import { applicationState } from "./application";

describe("application state", () => {
  it("should initialize properly", () => {
    expect(applicationState(undefined, {})).toMatchInlineSnapshot(`
Object {
  "config": Object {
    "dataDir": "/Users/nadeeshacabral/ccc/data",
  },
  "field": "",
  "file": "",
  "filesList": Array [],
  "inStream": null,
  "outStream": null,
  "resultCount": 0,
  "searchTime": 0,
  "term": "",
}
`);
  });

  it("should update existing keys", () => {
    const prev = applicationState(undefined, {
      field: "bar1",
      filesList: ["baz1", "baz1"]
    });

    const newField = "bar2";

    expect(applicationState(prev, { field: newField }).field).toBe(newField);
  });

  it("should not change non-updated keys", () => {
    const prev = applicationState(undefined, {
      field: "bar1",
      term: "term1"
    });

    expect(applicationState(prev, { field: "bar2" }).term).toBe(prev.term);
  });
});
