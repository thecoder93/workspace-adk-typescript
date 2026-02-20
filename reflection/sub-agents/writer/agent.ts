import { LlmAgent } from "@google/adk";
import { STATE_CURRENT_DOC } from "../../agents";

const STATE_INITIAL_TOPIC = "initial_topic";

export const initialWriterAgent = new LlmAgent({
  name: "InitialWriterAgent",
  model: "gemini-2.5-flash",
  includeContents: "none",
  instruction: `You are a Creative Writing Assistant tasked with starting a story.
    Write the *first draft* of a short story (aim for 2-4 sentences).
    Base the content *only* on the topic provided below. Try to introduce a specific element (like a character, a setting detail, or a starting action) to make it engaging.
    Topic: {{${STATE_INITIAL_TOPIC}}}

    Output *only* the story/document text. Do not add introductions or explanations.
    `,
  description:
    "Writes the initial document draft based on the topic, aiming for some initial substance.",
  outputKey: STATE_CURRENT_DOC,
});
