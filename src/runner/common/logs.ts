import * as prettyjson from "prettyjson";

import { State } from "../../state/application";
import { print } from "../../utils/print";

const UNEXPECTED_ERROR_TEXT = "Oh no! An unexpected error occured";

export const logResults = (currentState: State) => {
  print.success(
    `Search completed in ${currentState.searchTime / 1000}s with ${
      currentState.resultCount
    } result(s)`
  );
};

export const prettifyResult = result =>
  ["---", prettyjson.render(result)].join("\n");

export const logFailure = (error: Error) =>
  [UNEXPECTED_ERROR_TEXT, error.message].forEach(print.error);
