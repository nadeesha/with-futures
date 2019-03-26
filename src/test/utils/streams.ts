import * as stream from "stream";
import { fp } from "../../utils/fp";

export const createMockStream = () => {
  const s = new stream.Readable();
  s._read = fp.noop;

  return s;
};
