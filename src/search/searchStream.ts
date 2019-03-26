import { Readable } from "stream";
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

export const searchNode = (node: string, regex: RegExp) => data => {
  if (!data.value) {
    // ignore malformed value
    return null;
  }

  const toString = fp.isString(data.value[node]) ? fp.identity : JSON.stringify;

  const searchValue = toString(data.value[node]) || "";

  if (searchValue.match(regex)) {
    return data;
  }

  return null;
};

export const searchStream = (
  readStream: Readable,
  node: string,
  term: string,
  searchNodeFn = searchNode
) => {
  const regex = new RegExp(term);

  const results = searchSession();

  const pipeline = chain([
    readStream,
    parser(),
    streamArray(),
    searchNodeFn(node, regex)
  ]);

  pipeline.on("data", result => results.add(result));

  return future.node<Error, unknown[]>(done => {
    pipeline.on("end", () => done(null, results.get()));
    pipeline.on("error", error => done(error));
  });
};
