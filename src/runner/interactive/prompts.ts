import * as fs from "fs";
import * as prompts from "prompts";
import { future } from "../../utils/future";
import { dataStream } from "../../utils/dataStream";
import { getSearchableFields } from "../../search/getSearchableFields";

const promptsF = future.encaseP<
  Error,
  prompts.Answers<string>,
  prompts.PromptObject<string> | prompts.PromptObject<string>[]
>(prompts);

export const fileSelectionPrompt = (filesList: string[]) =>
  promptsF({
    type: "select",
    name: "value",
    message: "Which of the following files do you want to search in?",
    choices: filesList.map(file => ({ title: file, value: file }))
  });

export const fieldSelectionPrompt = (file: string) =>
  future
    .of<Error, fs.ReadStream>(dataStream(file))
    .chain(stream => getSearchableFields(stream))
    .chain(fields =>
      promptsF({
        type: "select",
        name: "value",
        message: "Which field do you want to search in?",
        choices: fields.map(field => ({ title: field, value: field }))
      })
    );

export const termInputPrompt = () =>
  promptsF({
    type: "text",
    name: "value",
    message: "What's your search term?"
  });
