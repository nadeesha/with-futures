import { FutureInstance } from "fluture";

import { searchStream } from "../../search/searchStream";
import { State, state } from "../../state/application";
import { dataStream } from "../../utils/dataStream";
import { getFiles } from "../../utils/getFiles";
import { print } from "../../utils/print";
import {
  fieldSelectionPrompt,
  fileSelectionPrompt,
  termInputPrompt
} from "./prompts";

type ChainableStep = (s: State) => FutureInstance<Error, State>;

const getSearchableFiles: ChainableStep = currentState => {
  return getFiles(currentState.config.dataDir).map(filesList =>
    state(currentState, { filesList })
  );
};

const getSelectedFile: ChainableStep = currentState =>
  fileSelectionPrompt(currentState.filesList).map(answer =>
    state(currentState, { file: answer.value })
  );

const getSearchField: ChainableStep = currentState =>
  fieldSelectionPrompt(currentState.file).map(answer =>
    state(currentState, { field: answer.value })
  );

const getSearchTerm: ChainableStep = currentState =>
  termInputPrompt().map(answer => state(currentState, { term: answer.value }));

const search: ChainableStep = currentState => {
  print.info(
    `Searching ${currentState.file} for ${currentState.field}: ${
      currentState.term
    }`
  );

  return searchStream(
    dataStream(currentState.file),
    currentState.field,
    currentState.term
  ).map(results => state(currentState, { results }));
};

export const steps = {
  getSearchableFiles,
  getSelectedFile,
  getSearchField,
  getSearchTerm,
  search
};
