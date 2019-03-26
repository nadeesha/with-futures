import * as fs from "fs";
import * as prompts from "prompts";
import { getSearchableFields } from "../../search/getSearchableFields";
import { dataStream } from "../../utils/dataStream";
import { future } from "../../utils/future";

const promptsF = future.encaseP<
  Error,
  prompts.Answers<string>,
  prompts.PromptObject<string> | Array<prompts.PromptObject<string>>
>(prompts);

export const fileSelectionPrompt = (filesList: string[]) =>
  promptsF({
    choices: filesList.map(file => ({ title: file, value: file })),
    message: "Which of the following files do you want to search in?",
    name: "value",
    type: "select"
  });

export const fieldSelectionPrompt = (file: string) =>
  future
    .of<Error, fs.ReadStream>(dataStream(file))
    .chain(stream => getSearchableFields(stream))
    .chain(fields =>
      promptsF({
        choices: fields.map(field => ({ title: field, value: field })),
        message: "Which field do you want to search in?",
        name: "value",
        type: "select"
      })
    );

export const termInputPrompt = () =>
  promptsF({
    message: "What's your search term?",
    name: "value",
    type: "text"
  });
