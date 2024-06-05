import { chatService } from "./chatService";
import { createPrompt } from "./createPrompt";
import { log } from "../extern/log";
import { exec } from "node:child_process";

export const printCommand = async (text: string) => {
  const response = await chatService({
    prompt: [createPrompt(text), "Assistant: "].join("\n"),
  });
  log.print(response);
};
