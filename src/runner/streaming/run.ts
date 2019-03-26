import { searchStream } from "../../search/searchStream";
import { future } from "../../utils/future";
import { state } from "../../state/application";
import { logFailure, logResults } from "../common/logs";
import { State } from "../../state/application";

export const streaming = (field: string, term: string) => {
  future
    .of<Error, State>(state(undefined, { field, term }))
    .chain(currentState =>
      searchStream(process.stdin, field, term).map(results =>
        state(currentState, { results })
      )
    )
    .fork(error => logFailure(error), state => logResults(state));
};
