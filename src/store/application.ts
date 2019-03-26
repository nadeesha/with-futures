import { config } from "./../config";
import { dataStream } from "./../utils/dataStream";
import { atom, derive } from "derivable";

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
