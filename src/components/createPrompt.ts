export const createPrompt = (
  text: string
) => `Human: Roleplay as a computer program that translates natural language commands into bash shell commands.

You take a natural language command from the user and then write a single line bash command that attempts to implement the behavior specified by the natural language command.

Output only the bash command itself on a single line with no other information.

Generate a bash command from the following text: ${text}`;
