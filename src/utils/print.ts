import chalk, { Chalk } from "chalk";
import { future } from "./future";

const config = {
  info: {
    prefix: "> ",
    decorator: chalk.blue
  },
  success: {
    prefix: "✔ ",
    decorator: chalk.green
  },
  error: {
    prefix: "! ",
    decorator: chalk.red
  },
  result: {
    prefix: "---\n",
    decorator: chalk.magenta
  }
};

const logger = (level: typeof config.info) => (message: string) =>
  console.log(level.decorator(`${level.prefix}${message}`));

export const print = {
  info: logger(config.info),
  success: logger(config.success),
  error: logger(config.error),
  result: logger(config.result)
};
