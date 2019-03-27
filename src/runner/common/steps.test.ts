import * as searchStreamModule from "../../search/searchStream";
import { createMockReadableStream } from "../../test/utils/streams";
import { future } from "../../utils/future";
import * as prompts from "../interactive/prompts";
import { applicationState } from "./../../state/application";
import { createMockWritableStream } from "./../../test/utils/streams";
import * as getFilesModule from "./../../utils/getFiles";
import { steps } from "./steps";

const fakeState = applicationState(undefined, {
  config: {
    dataDir: "foo"
  },
  field: "fakeField",
  file: "fakeFile",
  filesList: ["foo", "bar"],
  inStream: createMockReadableStream(),
  outStream: createMockWritableStream(),
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
    with: [
      fakeState.inStream,
      fakeState.field,
      fakeState.term,
      fakeState.outStream
    ]
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
