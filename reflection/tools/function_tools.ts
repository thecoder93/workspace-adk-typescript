import { FunctionTool } from "@google/adk";
import { exitLoop } from "./tools";
import z from "zod";

export const exitLoopTool = new FunctionTool({
  name: "exit_loop",
  description:
    "Call this function ONLY when the critique indicates no further changes are needed, signaling the iterative process should end.",
  parameters: z.object({}),
  execute: exitLoop,
});
