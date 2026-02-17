/**
 * Main agent file for the Random City Agent.
 */

import { LlmAgent } from "@google/adk";
import { config } from "./config";
import { INSTRUCTION } from "./prompts";
import { getRandomCityTool } from "./tools/function_tools";

export const rootAgent = new LlmAgent({
  model: config.agentSettings.model,
  name: config.agentSettings.name,
  instruction: INSTRUCTION,
  tools: [getRandomCityTool],
});
