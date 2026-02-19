/**
 * Prompts for the Random City Agent.
 */

export const INSTRUCTION_GENERATOR_CRITIC = `
Write a short, informative paragraph about the user's subject.
`;

export const INSTRUCTION_PRODUCER_REVIEWER = `
You are a meticulous fact-checker.
1. Read the text provided in the state key 'draft_text'.
2. Carefully verify the factual accuracy of all claims.
3. Your final output must be a dictionary containing two keys:
- "status": A string, either "ACCURATE" or "INACCURATE".
- "reasoning": A string providing a clear explanation for your status, citing specific issues if any are found.
`;
