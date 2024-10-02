import * as readline from "node:readline";
import chalk from "chalk";
import { Readable } from "node:stream";
import { chatService } from "./chatService";
import { createPrompt } from "./createPrompt";
import { log } from "../extern/log";
import { spawn } from "node:child_process";

const colorPrompt = chalk.bold.whiteBright;
const colorCommand = chalk.bold.greenBright;

export const runOnce = (input: string) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const ps = spawn("sh", { env: process.env });
  ps.stdout?.pipe(process.stdout);
  ps.stderr?.pipe(process.stderr);
  const inputStream = new Readable({
    async read() {
      let text: string = input;
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
          this.push(null);
          rl.close();
          process.exit(1);
        }
      }
      this.push(response + "\n");
      this.push(null);
      rl.close();
    },
  });
  inputStream.pipe(ps.stdin);
};
