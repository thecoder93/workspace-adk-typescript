/**
 * Configuration for the Random City Agent.
 */

import { env } from "node:process";

function getEnv(key: string, defaultValue: string): string {
  return env[key] || defaultValue;
}

const GOOGLE_API_KEY = getEnv("GOOGLE_API_KEY", "");

export const configCritic = {
  agentSettings: {
    name: "reflection_critic_agent",
    description: "Generates a draft text.",
    model: "gemini-2.5-flash",
  },
  GOOGLE_API_KEY,
};

export const configProducer = {
  agentSettings: {
    name: "reflection_producer_agent",
    description: "Reviews a draft text for factual accuracy.",
    model: "gemini-2.5-flash",
  },
  GOOGLE_API_KEY,
};
