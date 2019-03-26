import { FutureInstance } from "fluture";
import * as invariant from "invariant";

import { searchStream } from "../../search/searchStream";
import { State, state } from "../../state/application";
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
    state(currentState, { filesList })
  );

const getSelectedFile: ChainableStep = currentState =>
  fileSelectionPrompt(currentState.filesList).map(answer =>
    state(currentState, {
      file: answer.value,
      stream: dataStream(answer.value)
    })
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

  invariant(currentState.stream, "Stream must be set");
  invariant(currentState.field, "Search field must be set");
  invariant(currentState.term, "Search term must be set");

  return searchStream(
    currentState.stream,
    currentState.field,
    currentState.term
  ).map(results => state(currentState, { results }));
};

export const steps = {
  getSearchField,
  getSearchTerm,
  getSearchableFiles,
  getSelectedFile,
  search
};
