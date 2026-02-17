/**
 * Configuration for the Random City Agent.
 */

import { env } from "node:process";

function getEnv(key: string, defaultValue: string): string {
  return env[key] || defaultValue;
}

export const config = {
  agentSettings: {
    name: "random_city_agent",
    model: "gemini-2.5-flash",
  },
  GOOGLE_API_KEY: getEnv("GOOGLE_API_KEY", ""),
};
