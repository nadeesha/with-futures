import * as searchStreamModule from "../../search/searchStream";
import { createMockStream } from "../../test/utils/streams";
import { future } from "../../utils/future";
import * as prompts from "../interactive/prompts";
import { state } from "./../../state/application";
import * as getFilesModule from "./../../utils/getFiles";
import { steps } from "./steps";

const fakeState = state(undefined, {
  config: {
    dataDir: "foo"
  },
  field: "fakeField",
  file: "fakeFile",
  filesList: ["foo", "bar"],
  stream: createMockStream(),
  term: "fakeTerm"
});

const stepTests = [
  {
    fn: steps.getSearchableFiles,
    shouldCall: jest.spyOn(getFilesModule, "getFiles"),
    with: [fakeState.config.dataDir]
  },
  {
    fn: steps.getSelectedFile,
    shouldCall: jest.spyOn(prompts, "fileSelectionPrompt"),
    with: [fakeState.filesList]
  },
  {
    fn: steps.getSearchField,
    shouldCall: jest
      .spyOn(prompts, "fieldSelectionPrompt")
      .mockReturnValue(future.of({ value: "foo" })),
    with: [fakeState.file]
  },
  {
    fn: steps.getSearchTerm,
    shouldCall: jest.spyOn(prompts, "termInputPrompt"),
    with: []
  },
  {
    fn: steps.search,
    shouldCall: jest.spyOn(searchStreamModule, "searchStream"),
    with: [fakeState.stream, fakeState.field, fakeState.term]
  }
];

stepTests.forEach(test => {
  describe(test.fn.name, () => {
    it("should function correctly", () => {
      test.shouldCall.mockImplementation(() => future.of({}) as any);
      test.fn(fakeState);

      expect(test.shouldCall).toHaveBeenCalledWith(...test.with);
    });
  });
});
