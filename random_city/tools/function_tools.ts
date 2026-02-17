import { FunctionTool } from "@google/adk";
import { getRandomCity } from "./tools";

export const getRandomCityTool = new FunctionTool({
  name: "get_random_city",
  description: "Returns a random city.",
  execute: async () => getRandomCity(),
});
