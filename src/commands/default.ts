import { cli } from "../cli";
import { chatService } from "../components/chatService";
import { createPrompt } from "../components/createPrompt";
import { spawn } from "node:child_process";
import { log } from "../extern/log";
import * as readline from "node:readline";
import { Readable } from "node:stream";
import chalk from "chalk";

const colorPrompt = chalk.bold.whiteBright;
const colorCommand = chalk.bold.greenBright;

cli.command<{
  input?: string;
}>(
  "$0",
  "",
  () => {},
  async () => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const ps = spawn("sh");
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
  }
);
