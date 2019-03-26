import * as prettyjson from "prettyjson";

import { State, state } from "../../state/application";
import { print } from "../../utils/print";

const UNEXPECTED_ERROR_TEXT = "Oh no! An unexpected error occured";

export const logResults = (state: State) => {
  print.success(`Search completed with ${state.results.length} results`);
  state.results
    .map(result => prettyjson.render(result.value))
    .forEach(print.result);
};

export const logFailure = (error: Error) =>
  [UNEXPECTED_ERROR_TEXT, error.message].forEach(print.error);
