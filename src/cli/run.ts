import * as fs from "fs";
import { DATA_DIR } from "./../config";
import { getFiles } from "./../data/getFiles";
import { createPrompts } from "./createPrompts";
import { searchJSONFile } from "../data/searchJSONFile";
import { future } from "../utils/future";
import { createDataStream } from "../data/createDataStream";

export const run = () =>
  getFiles(DATA_DIR)
    .chain(createPrompts)
    .map(answers => {
      console.log({ answers });

      return answers.files.map(file =>
        searchJSONFile(createDataStream(file), answers.field, answers.term)
      );
    })
    .chain(searches => {
      console.log({ searches });
      return future.parallel(Infinity, searches);
    })
    .fork(console.error, console.log);

run();
