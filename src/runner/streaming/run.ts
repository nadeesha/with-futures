import { state, State } from "../../state/application";
import { future } from "../../utils/future";
import { logFailure, logResults } from "../common/logs";
import { steps } from "../common/steps";

export const streaming = (field: string, term: string) => {
  future
    .of<Error, State>(state(undefined, { field, term, stream: process.stdin }))
    .chain(steps.search)
    .fork(error => logFailure(error), currentState => logResults(currentState));
};
