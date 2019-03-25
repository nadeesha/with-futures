import * as fs from "fs";
import { DATA_DIR } from "./../config";
import { getFiles } from "./../data/getFiles";
import {
  fileSelectionPrompt,
  fieldSelectionPrompt,
  termInputPrompt
} from "./createPrompts";
import { searchJSONFile } from "../data/searchJSONFile";
import { future } from "../utils/future";
import { createDataStream } from "../data/createDataStream";

const session = () => {
  const data = {
    file: "",
    field: "",
    term: ""
  };

  return {
    set: (key: keyof typeof data, value: string) => (data[key] = value),
    get: () => data
  };
};

export const run = () => {
  const data = session();

  getFiles(DATA_DIR)
    .chain(filesList => {
      return fileSelectionPrompt(filesList);
    })
    .chain(answer => {
      console.log({ answer });
      data.set("file", answer.value);
      return fieldSelectionPrompt(answer.value);
    })
    .chain(answer => {
      data.set("field", answer.value);
      return termInputPrompt();
    })
    .map(answer => {
      data.set("term", answer.value);
      return data.get();
    })
    .chain(answers => {
      return searchJSONFile(
        createDataStream(answers.file),
        answers.field,
        answers.term
      );
    })
    .fork(console.error, console.log);
};

run();
