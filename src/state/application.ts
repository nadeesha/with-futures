import { Readable } from "stream";

import { config } from "./../config";

const initialState = {
  config,
  field: "",
  file: "",
  filesList: [],
  results: [],
  stream: null as Readable | null,
  term: ""
};

export type State = typeof initialState;

export const state = (prevState = initialState, updated: Partial<State>) => ({
  ...prevState,
  ...updated
});
