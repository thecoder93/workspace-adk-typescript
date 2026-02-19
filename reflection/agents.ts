import { LlmAgent } from "@google/adk";
import { configCritic, configProducer } from "./config";
import { INSTRUCTION_GENERATOR_CRITIC, INSTRUCTION_PRODUCER_REVIEWER } from "./prompts";
import { exitLoopTool } from "./tools/function_tools";

const DRAFT_TEXT = "draft_text";
const REVIEW_OUTPUT = "review_output";

export const generatorCriticAgent = new LlmAgent({
  model: configCritic.agentSettings.model,
  name: configCritic.agentSettings.name,
  description: configCritic.agentSettings.description,
  instruction: INSTRUCTION_GENERATOR_CRITIC,
  outputKey: DRAFT_TEXT,
  tools: [exitLoopTool],
});

export const producerReviewerAgent = new LlmAgent({
  model: configProducer.agentSettings.model,
  name: configProducer.agentSettings.name,
  description: configProducer.agentSettings.description,
  instruction: INSTRUCTION_PRODUCER_REVIEWER,
  outputKey: REVIEW_OUTPUT,
  tools: [exitLoopTool],
});
