import { searchStream } from "../../search/searchStream";
import { state } from "../../state/application";
import { State } from "../../state/application";
import { future } from "../../utils/future";
import { logFailure, logResults } from "../common/logs";

export const streaming = (field: string, term: string) => {
  future
    .of<Error, State>(state(undefined, { field, term }))
    .chain(currentState =>
      searchStream(process.stdin, field, term).map(results =>
        state(currentState, { results })
      )
    )
    .fork(error => logFailure(error), currentState => logResults(currentState));
};
