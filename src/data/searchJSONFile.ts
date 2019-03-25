import * as fs from "fs";
import { streamArray } from "stream-json/streamers/StreamArray";

import { fp } from "../utils/fp";
import { future } from "../utils/future";

const { chain } = require("stream-chain");
const { parser } = require("stream-json");

const searchSession = () => {
  let matches = [];

  return {
    add: (value: unknown) => matches.push(value),
    get: () => matches
  };
};

export const searchJSONFile = (
  readStream: fs.ReadStream,
  node: string,
  term: string
) => {
  const regex = new RegExp(term);

  const results = searchSession();

  const pipeline = chain([
    readStream,
    parser(),
    streamArray(),
    data => {
      const lofiToString = fp.isString(data.value[node])
        ? fp.identity
        : JSON.stringify;

      const searchValue = lofiToString(data.value[node]) || "";

      if (searchValue.match(regex)) {
        return data;
      }

      return null;
    }
  ]);

  pipeline.on("data", result => results.add(result));

  return future.node(done => {
    pipeline.on("end", () => done(null, results.get()));
    pipeline.on("error", error => done(error));
  });
};
