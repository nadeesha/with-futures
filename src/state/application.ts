import { config } from "./../config";

const initialState = {
  filesList: [],
  file: "",
  field: "",
  term: "",
  results: [],
  config
};

export type State = typeof initialState;

export const state = (prevState = initialState, updated: Partial<State>) => ({
  ...prevState,
  ...updated
});
