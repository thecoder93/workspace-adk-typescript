import { ToolContext } from "@google/adk";

export function exitLoop(input: unknown, toolContext: ToolContext | undefined) {
  if (toolContext) {
    console.log(
      `  [Tool Call] exit_loop triggered by ${toolContext.agentName} with input: ${input}`,
    );
    toolContext.actions.escalate = true;
  }
  return {};
}
