import { Readable, Writable } from "stream";
import { streamArray } from "stream-json/streamers/StreamArray";

import { fp } from "../utils/fp";
import { future } from "../utils/future";

import { chain } from "stream-chain";
import { parser } from "stream-json";
import { prettifyResult } from "../runner/common/logs";

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
  writeStream: Writable,
  searchNodeFn = searchNode
) => {
  const regex = new RegExp(term);

  let count = 0;

  const pipeline = chain([
    readStream,
    parser(),
    streamArray(),
    searchNodeFn(node, regex)
  ]);

  const startTime = Date.now();

  pipeline.on("data", result => {
    count++;
    writeStream.write(prettifyResult(result));
    writeStream.write("\n");
  });

  return future.node<Error, { count: number; time: number }>(done => {
    pipeline.on("end", () => {
      const endTime = Date.now();
      done(null, { count, time: endTime - startTime });
    });

    pipeline.on("error", error => done(error));
  });
};
