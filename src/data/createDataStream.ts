import { DATA_DIR } from "./../config";
import * as fs from "fs";
import * as path from "path";

export const createDataStream = (dataFile: string) =>
  fs.createReadStream(path.join(DATA_DIR, dataFile));
