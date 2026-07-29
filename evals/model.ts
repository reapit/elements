import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";

// EVAL_AGENT_MODEL: Bedrock model ID for the agent-under-test.
// EVAL_JUDGE_MODEL: Bedrock model ID for the LLM-as-judge scorers.
// EVAL_AWS_REGION: AWS region where the models are enabled.
// AWS credentials are sourced from the standard AWS credential chain
// (environment variables, instance profile, etc.).
const AGENT_MODEL = process.env.EVAL_AGENT_MODEL ?? "au.anthropic.claude-sonnet-4-5-20250929-v1:0";
const JUDGE_MODEL = process.env.EVAL_JUDGE_MODEL ?? "au.anthropic.claude-sonnet-4-5-20250929-v1:0";
const AWS_REGION = process.env.EVAL_AWS_REGION ?? "ap-southeast-2";

function createProvider() {
  return createAmazonBedrock({
    region: AWS_REGION,
  });
}

/**
 * Model used by the agent-under-test when executing UI tasks.
 */
export function getAgentModel() {
  return createProvider()(AGENT_MODEL);
}

/**
 * Model used by LLM-as-judge scorers to evaluate agent output.
 * Intentionally separate from the agent model to avoid self-evaluation bias.
 */
export function getJudgeModel() {
  return createProvider()(JUDGE_MODEL);
}
