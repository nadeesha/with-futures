import * as prettyjson from "prettyjson";

import { State, state } from "../../state/application";
import { print } from "../../utils/print";

export const logResults = (state: State) => {
  print.success(`Search completed with ${state.results.length} results`);
  state.results
    .map(result => prettyjson.render(result.value))
    .forEach(print.result);
};

export const logFailure = (error: Error) => print.error(error.message);
