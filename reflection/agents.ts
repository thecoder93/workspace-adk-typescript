import { LlmAgent } from "@google/adk";
import { iterativeWritingPipeline } from "./tools/function_tools";

export const rootAgent = new LlmAgent({
  model: "gemini-2.5-flash",
  name: "reflaction_agent",
  instruction: "You MUST call IterativeWritingPipeline.",
  subAgents: [iterativeWritingPipeline],
});
