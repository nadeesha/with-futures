import { State, state } from "../../state/application";
import { future } from "../../utils/future";
import { logFailure, logResults } from "../common/logs";
import { steps } from "./steps";

export const interactive = () => {
  future
    .of<Error, State>(state(undefined, {}))
    .chain(steps.getSearchableFiles)
    .chain(steps.getSelectedFile)
    .chain(steps.getSearchField)
    .chain(steps.getSearchTerm)
    .chain(steps.search)
    .fork(error => logFailure(error), currentState => logResults(currentState));
};
