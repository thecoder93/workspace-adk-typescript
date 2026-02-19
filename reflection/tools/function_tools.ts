import { FunctionTool, LoopAgent, SequentialAgent } from "@google/adk";
import { generatorCriticAgent, producerReviewerAgent } from "../agents";
import { exitLoop } from "./tools";

export const exitLoopTool = new FunctionTool({
  name: "exit_loop",
  description:
    "Call this function ONLY when the critique indicates no further changes are needed, signaling the iterative process should end.",
  parameters: {},
  execute: exitLoop,
});

export const refinementLoop = new LoopAgent({
  name: "RefinementLoop",
  subAgents: [generatorCriticAgent, producerReviewerAgent],
  maxIterations: 5,
});

export const rootAgent = new SequentialAgent({
  name: "IterativeWritingPipeline",
  subAgents: [generatorCriticAgent, refinementLoop],
});
