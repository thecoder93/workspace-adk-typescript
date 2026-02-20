import { SequentialAgent } from "@google/adk";
import { refinementLoop } from "./sub-agents/refinement/agent";
import { initialWriterAgent } from "./sub-agents/writer/agent";

export const STATE_CURRENT_DOC = "current_document";

export const rootAgent = new SequentialAgent({
  name: "IterativeWritingPipeline",
  subAgents: [initialWriterAgent, refinementLoop],
  description:
    "Writes an initial document and then iteratively refines it with critique using an exit tool.",
});
