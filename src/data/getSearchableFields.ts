import * as fs from "fs";
import { pick } from "stream-json/filters/Pick";
import { streamValues } from "stream-json/streamers/StreamValues";

import { fp } from "../utils/fp";
import { future } from "../utils/future";

const { chain } = require("stream-chain");
const { parser } = require("stream-json");

export const getSearchableFields = (readStream: fs.ReadStream) => {
  let keys = [];

  const pipeline = chain([
    readStream,
    parser(),
    pick({ filter: /^0/ }),
    streamValues(),
    ({ value }) => {
      return fp.keys(value);
    }
  ]);

  pipeline.on("data", key => {
    keys.push(key);
  });

  return future.node<Error, string[]>(done => {
    pipeline.on("end", () => done(null, keys));
    pipeline.on("error", error => done(error));
  });
};
