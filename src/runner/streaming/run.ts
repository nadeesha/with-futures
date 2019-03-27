import { applicationState, State } from "../../state/application";
import { future } from "../../utils/future";
import { logFailure, logResults } from "../common/logs";
import { steps } from "../common/steps";

export const streaming = (field: string, term: string) => {
  future
    .of<Error, State>(
      applicationState(undefined, {
        field,
        inStream: process.stdin,
        outStream: process.stdout,
        term
      })
    )
    .chain(steps.search)
    .fork(error => logFailure(error), currentState => logResults(currentState));
};
