import { State, applicationState } from "../../state/application";
import { future } from "../../utils/future";
import { logFailure, logResults } from "../common/logs";
import { steps } from "../common/steps";

export const interactive = () => {
  future
    .of<Error, State>(
      applicationState(undefined, {
        outStream: process.stdout
      })
    )
    .chain(steps.getSearchableFiles)
    .chain(steps.getSelectedFile)
    .chain(steps.getSearchField)
    .chain(steps.getSearchTerm)
    .chain(steps.search)
    .fork(error => logFailure(error), currentState => logResults(currentState));
};
