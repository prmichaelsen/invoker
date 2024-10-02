import chalk from "chalk";
import { Readable } from "node:stream";
import { chatService } from "./chatService";
import { createPrompt } from "./createPrompt";
import { log } from "../extern/log";
import { spawn } from "node:child_process";

const colorCommand = chalk.bold.greenBright;

export const runForce = (input: string, silent: boolean) => {
  const ps = spawn("sh", { env: process.env });
  ps.stdout?.pipe(process.stdout);
  ps.stderr?.pipe(process.stderr);
  const inputStream = new Readable({
    async read() {
      let text: string = input;
      const conversation = [createPrompt(text), "Assistant: "];
      const response = await chatService({
        prompt: conversation.join("\n\n"),
      });
      if (!silent) {
        log.print(
          colorCommand(response),
        );
      }
      this.push(response);
      this.push(null);
    },
  });
  inputStream.pipe(ps.stdin);
};
