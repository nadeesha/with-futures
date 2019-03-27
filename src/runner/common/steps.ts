import { FutureInstance } from "fluture";
import * as invariant from "invariant";

import { searchStream } from "../../search/searchStream";
import { applicationState, State } from "../../state/application";
import { dataStream } from "../../utils/dataStream";
import { getFiles } from "../../utils/getFiles";
import { print } from "../../utils/print";
import {
  fieldSelectionPrompt,
  fileSelectionPrompt,
  termInputPrompt
} from "../interactive/prompts";

type ChainableStep = (s: State) => FutureInstance<Error, State>;

const getSearchableFiles: ChainableStep = currentState =>
  getFiles(currentState.config.dataDir).map(filesList =>
    applicationState(currentState, { filesList })
  );

const getSelectedFile: ChainableStep = currentState =>
  fileSelectionPrompt(currentState.filesList).map(answer =>
    applicationState(currentState, {
      file: answer.value,
      inStream: dataStream(answer.value)
    })
  );

const getSearchField: ChainableStep = currentState =>
  fieldSelectionPrompt(currentState.file).map(answer =>
    applicationState(currentState, { field: answer.value })
  );

const getSearchTerm: ChainableStep = currentState =>
  termInputPrompt().map(answer =>
    applicationState(currentState, { term: answer.value })
  );

const search: ChainableStep = currentState => {
  print.info(
    `Searching ${currentState.file} for ${currentState.field}: ${
      currentState.term
    }`
  );

  invariant(currentState.inStream, "Input stream must be set");
  invariant(currentState.field, "Search field must be set");
  invariant(currentState.term, "Search term must be set");
  invariant(currentState.outStream, "Output stream must be set");

  return searchStream(
    currentState.inStream,
    currentState.field,
    currentState.term,
    currentState.outStream
  ).map(({ count, time }) =>
    applicationState(currentState, { resultCount: count, searchTime: time })
  );
};

export const steps = {
  getSearchField,
  getSearchTerm,
  getSearchableFiles,
  getSelectedFile,
  search
};
