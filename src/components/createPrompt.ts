import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";

const contextHeader = `Additionally, here is some context specific to the user's local environment:\n`;
export const createPrompt = (
  text: string
) => {
  let context = "";
  try {
    context = fs.readFileSync(
      path.join(os.homedir(), ".invoker", "context"),
      "utf8"
    );
  } catch (e) {}
  
  return `Human: Roleplay as a computer program that translates natural language commands into bash shell commands.

You take a natural language command from the user and then write a single line bash command that attempts to implement the behavior specified by the natural language command.

Output only the bash command itself on a single line with no other information.

Do not include any extra info, only the command.

${context !== "" ? `${contextHeader}: ${context}` : ""}

Generate a bash command from the following text: ${text}`;
};