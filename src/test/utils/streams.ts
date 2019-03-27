import * as stream from "stream";
import { fp } from "../../utils/fp";

export const createMockReadableStream = () => {
  const s = new stream.Readable();
  s._read = fp.noop;

  return s;
};

export const createMockWritableStream = () => {
  const s = new stream.Writable();
  s._write = fp.noop;

  return s;
};
