import * as fs from "fs";
import * as path from "path";
import { fp } from "./fp";
import { future } from "./future";

export const onlyJSONFiles = fp.pipe(
  fp.map(fp.toLower),
  fp.filter(fp.endsWith(".json")),
);

export const getFiles = (dirPath: string) =>
  future
    .node<NodeJS.ErrnoException, string[]>((done) =>
      fs.readdir(dirPath, "utf8", done),
    )
    .map(onlyJSONFiles);
