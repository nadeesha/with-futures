import { Readable, Writable } from "stream";

import { config } from "./../config";

const initialState = {
  config,
  field: "",
  file: "",
  filesList: [],
  inStream: null as Readable | null,
  outStream: null as Writable | null,
  resultCount: 0,
  searchTime: 0,
  term: ""
};

export type State = typeof initialState;

export const applicationState = (
  prevState = initialState,
  updated: Partial<State>
) => ({
  ...prevState,
  ...updated
});
