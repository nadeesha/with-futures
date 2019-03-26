import chalk, { Chalk } from "chalk";
import { future } from "./future";

const config = {
  error: {
    decorator: chalk.red,
    prefix: "! "
  },
  info: {
    decorator: chalk.blue,
    prefix: "> "
  },
  result: {
    decorator: chalk.magenta,
    prefix: "---\n"
  },
  success: {
    decorator: chalk.green,
    prefix: "✔ "
  }
};

const logger = (level: typeof config.info) => (message: string) =>
  // tslint:disable-next-line: no-console
  console.log(level.decorator(`${level.prefix}${message}`));

export const print = {
  error: logger(config.error),
  info: logger(config.info),
  result: logger(config.result),
  success: logger(config.success)
};
