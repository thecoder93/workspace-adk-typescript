import { FunctionTool, LlmAgent, LoopAgent, SequentialAgent } from "@google/adk";
import { exitLoop } from "./tools";
import { configCritic, configProducer } from "../config";
import { INSTRUCTION_GENERATOR_CRITIC, INSTRUCTION_PRODUCER_REVIEWER } from "../prompts";
import { Type } from "@google/genai";

const DRAFT_TEXT = "draft_text";
const REVIEW_OUTPUT = "review_output";

export const exitLoopTool = new FunctionTool({
  name: "exit_loop",
  description:
    "Call this function ONLY when the critique indicates no further changes are needed, signaling the iterative process should end.",
  parameters: {},
  execute: exitLoop,
});

const authorAgent = new LlmAgent({
  model: configCritic.agentSettings.model,
  name: configCritic.agentSettings.name,
  description: configCritic.agentSettings.description,
  instruction: INSTRUCTION_GENERATOR_CRITIC,
  outputKey: DRAFT_TEXT,
  afterAgentCallback: async (context) => {
    // Access the state to check a condition
    const review_output: { status: string; reasoning: string } =
      context.state.get("review_output")!;
    if (review_output?.status === "ACCURATE") {
      context.eventActions.escalate = true; // Signals the loop to stop
      return;
    }
    return undefined;
  },
});

const reviewerAgent = new LlmAgent({
  model: configProducer.agentSettings.model,
  name: configProducer.agentSettings.name,
  description: configProducer.agentSettings.description,
  instruction: INSTRUCTION_PRODUCER_REVIEWER,
  outputKey: REVIEW_OUTPUT,
  outputSchema: {
    type: Type.OBJECT,
    properties: {
      status: {
        type: Type.STRING,
        description: "The status of the review.",
      },
      reasoning: {
        type: Type.STRING,
        description: "The reasoning of the review.",
      },
    },
    required: ["status", "reasoning"],
  },
  afterAgentCallback: async (context) => {
    // Access the state to check a condition
    const review_output: { status: string; reasoning: string } =
      context.state.get("review_output")!;
    if (review_output?.status === "ACCURATE") {
      context.eventActions.escalate = true; // Signals the loop to stop
      return;
    }
    return undefined;
  },
});

const refinementLoop = new LoopAgent({
  name: "RefinementLoop",
  subAgents: [authorAgent, reviewerAgent],
  maxIterations: 5,
});

export const iterativeWritingPipeline = new SequentialAgent({
  name: "IterativeWritingPipeline",
  subAgents: [refinementLoop],
});
