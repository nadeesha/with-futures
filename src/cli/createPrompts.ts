import * as prompts from "prompts";
import { future } from "../utils/future";

export const createPrompts = (filesList: string[]) =>
  future.node<Error, prompts.Answers<"files" | "field" | "term">>(done =>
    prompts([
      {
        type: "multiselect",
        name: "files",
        message:
          "Which of the following files do you want to search in? (multiples are ok)",
        choices: filesList.map(file => ({ title: file, value: file }))
      },
      {
        type: "text",
        name: "field",
        message: "Which field do you want to search in?"
      },
      {
        type: "text",
        name: "term",
        message: "What's your search term?"
      }
    ])
      .then(answers => done(null, answers))
      .catch(done)
  );
