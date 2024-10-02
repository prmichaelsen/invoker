import { BedrockRuntime, config } from "aws-sdk";

config.update({ region: "us-east-1" });

export interface ChatServiceInput {
  prompt: string;
}
export const chatService = async (input: ChatServiceInput) => {
  const { prompt } = input;
  const params = {
    body: JSON.stringify({
      prompt,
      temperature: 0,
      top_p: 0,
      top_k: 0,
      max_tokens_to_sample: 200000,
      stop_sequences: ["[STOP]"],
    }),
    modelId: "anthropic.claude-v2",
    accept: "application/json",
    contentType: "application/json",
  };
  const bedrockRuntime = new BedrockRuntime({
    apiVersion: "2023-09-30",
  });
  const res = await bedrockRuntime.invokeModel(params).promise();
  const result = JSON.parse(String(res.body)) as {
    completion: string;
  };
  const completion = result.completion.trim();
  const backTicks = "```";
  const openBackTicksIdx = completion.indexOf(backTicks);
  const closeBackTicksIdx = completion.lastIndexOf(backTicks);
  if (openBackTicksIdx > -1 && closeBackTicksIdx > -1) {
    return completion
      .substring(openBackTicksIdx + backTicks.length, closeBackTicksIdx)
      .split('\n').slice(1).join('\n')
      .trim();
  } else {
    return completion;
  }
};
