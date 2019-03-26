import * as fs from "fs";
import * as path from "path";
import { config } from "../config";

export const dataStream = (dataFile: string) =>
  fs.createReadStream(path.join(config.dataDir, dataFile));
