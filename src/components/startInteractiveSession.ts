import * as readline from "node:readline";
import chalk from "chalk";
import { Readable } from "node:stream";
import { chatService } from "./chatService";
import { createPrompt } from "./createPrompt";
import { log } from "../extern/log";
import { spawn } from "node:child_process";

const colorPrompt = chalk.bold.whiteBright;
const colorCommand = chalk.bold.greenBright;

export const startInteractiveSession = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const ps = spawn("sh", { env: process.env });
  ps.stdout?.pipe(process.stdout);
  ps.stderr?.pipe(process.stderr);
  const inputStream = new Readable({
    async read() {
      while (true) {
        let text: string | undefined;
        while (!text) {
          text = await new Promise<string>((resolve) =>
            rl.question("", resolve)
          );
        }
        let isPromptToConfirmCommand = false;
        if (text.startsWith("?")) {
          isPromptToConfirmCommand = true;
          text = text.substring(2);
        }
        const conversation = [createPrompt(text), "Assistant: "];
        const response = await chatService({
          prompt: conversation.join("\n\n"),
        });
        log.print(
          colorCommand(response),
          isPromptToConfirmCommand ? colorPrompt("(y/N)") : ""
        );
        if (isPromptToConfirmCommand) {
          const confirm = await new Promise<string>((resolve) =>
            rl.question("", resolve)
          );
          if (confirm.toLowerCase() !== "y") {
            continue;
          }
        }
        this.push(response + "\n");
      }
    },
  });
  inputStream.pipe(ps.stdin);
};
