import { interactive } from "./interactive/run";
import * as program from "commander";
import { streaming } from "./streaming/run";

program
  .option("-i --interactive", "Run in interactive mode")
  .option("-s --streaming", "Run in streaming mode")
  .option("-f --field [field]", "Field to search in (streaming mode)")
  .option("-t --term [term]", "Term to search for (streaming mode)")
  .parse(process.argv);

if (program.interactive) {
  interactive();
} else if (program.streaming) {
  streaming(program.field, program.term);
} else {
  program.outputHelp();
}
