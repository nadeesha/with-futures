import { DATA_DIR } from "./../config";
import { getFiles } from "./../data/getFiles";
import { createPrompts } from "./createPrompts";

export const run = () =>
  getFiles(DATA_DIR)
    .chain(createPrompts)
    .fork(console.error, console.log);

run();
