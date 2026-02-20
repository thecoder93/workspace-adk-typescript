import { LlmAgent, LoopAgent } from "@google/adk";
import { STATE_CURRENT_DOC } from "../../agents";
import { exitLoopTool } from "../../tools/function_tools";

const STATE_CRITICISM = "criticism";
const COMPLETION_PHRASE = "No major issues found.";

const criticAgentInLoop = new LlmAgent({
  name: "CriticAgent",
  model: "gemini-2.5-flash",
  includeContents: "none",
  instruction: `You are a Constructive Critic AI reviewing a short document draft (typically 2-6 sentences). Your goal is balanced feedback.

    **Document to Review:**

    {{current_document}}


    **Task:**
    Review the document for clarity, engagement, and basic coherence according to the initial topic (if known).

    IF you identify 1-2 *clear and actionable* ways the document could be improved to better capture the topic or enhance reader engagement (e.g., "Needs a stronger opening sentence", "Clarify the character's goal"):
    Provide these specific suggestions concisely. Output *only* the critique text.

    ELSE IF the document is coherent, addresses the topic adequately for its length, and has no glaring errors or obvious omissions:
    Respond *exactly* with the phrase "${COMPLETION_PHRASE}" and nothing else. It doesn't need to be perfect, just functionally complete for this stage. Avoid suggesting purely subjective stylistic preferences if the core is sound.

    Do not add explanations. Output only the critique OR the exact completion.
`,
  description:
    "Reviews the current draft, providing critique if clear improvements are needed, otherwise signals completion.",
  outputKey: STATE_CRITICISM,
});

const refinerAgentInLoop = new LlmAgent({
  name: "RefinerAgent",
  model: "gemini-2.5-flash",
  includeContents: "none",
  instruction: `You are a Creative Writing Assistant refining a document based on feedback OR exiting the process.
    **Current Document:**

    {{current_document}}

    **Critique/Suggestions:**
    {{criticism}}

    **Task:**
    Analyze the 'Critique/Suggestions'.
    IF the critique is *exactly* "${COMPLETION_PHRASE}":
    You MUST call the 'exit_loop' function. Do not output any text.
    ELSE (the critique contains actionable feedback):
    Carefully apply the suggestions to improve the 'Current Document'. Output *only* the refined document text.

    Do not add explanations. Either output the refined document OR call the exit_loop function.
`,
  tools: [exitLoopTool],
  description:
    "Refines the document based on critique, or calls exit_loop if critique indicates completion.",
  outputKey: STATE_CURRENT_DOC,
});

export const refinementLoop = new LoopAgent({
  name: "RefinementLoop",
  subAgents: [criticAgentInLoop, refinerAgentInLoop],
  maxIterations: 5,
});
