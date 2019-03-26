import { config } from "./../config";

const initialState = {
  config,
  field: "",
  file: "",
  filesList: [],
  results: [],
  term: ""
};

export type State = typeof initialState;

export const state = (prevState = initialState, updated: Partial<State>) => ({
  ...prevState,
  ...updated
});
