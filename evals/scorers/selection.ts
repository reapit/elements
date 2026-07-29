import { generateObject } from "ai";
import { createScorer } from "evalite";
import { z } from "zod";

import { getJudgeModel } from "../model.js";

/**
 * LLM-as-judge scorer for component selection quality.
 *
 * Evaluates each criterion in the expected list independently.
 * Score = proportion of criteria met (0–1).
 */
export const selectionScorer = createScorer<unknown, string, string[]>({
  name: "Component Selection",
  description:
    "Judges whether the agent selected the correct components, avoided anti-patterns, chose appropriate variants, and reasoned well about the design decision.",
  scorer: async ({ output, expected: criteria }) => {
    if (!criteria || criteria.length === 0)
      throw new Error("selectionScorer requires expected criteria");

    const { object } = await generateObject({
      model: getJudgeModel(),
      mode: "tool",
      schema: z.object({
        criteriaResults: z
          .array(
            z.object({
              criterion: z.string().describe("The criterion being evaluated, copied verbatim."),
              met: z.boolean().describe("Whether the agent output satisfies this criterion."),
              notes: z.string().describe("Brief explanation of the assessment."),
            }),
          )
          .describe("One entry per criterion, in the same order as provided."),
        rationale: z.string().describe("Overall assessment of the agent response."),
      }),
      prompt: `You are evaluating an AI agent's response to a UI development task. The agent had access to ZeroHeight design documentation only.

## Criteria to evaluate
${criteria.map((c, i) => `${i + 1}. ${c}`).join("\n")}

## Agent output
${output}

For each criterion, determine whether the agent's response satisfies it. Be strict but fair — partial evidence counts as not met. Return one result per criterion in the same order as listed.`,
    });

    const met = object.criteriaResults.filter((r) => r.met).length;
    const total = object.criteriaResults.length;

    return {
      score: total > 0 ? met / total : 0,
      metadata: {
        rationale: object.rationale,
        criteriaResults: object.criteriaResults,
        met,
        total,
      },
    };
  },
});
