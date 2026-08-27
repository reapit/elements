// Storybook-only scenario: the agent has access to Storybook component documentation only.
// Scored on implementation correctness: correct imports, valid props, and sound JSX patterns.
// Use this suite to identify gaps in the Storybook API documentation.
import { generateText, isStepCount } from "ai";
import { evalite } from "evalite";

import type { EvalTask } from "./fixtures/tasks.js";
import { tasks } from "./fixtures/tasks.js";
import { getAgentModel } from "./model.js";
import { implementationScorer } from "./scorers/implementation.js";
import { storybookTools } from "./tools/storybook.js";

evalite<EvalTask, string, string[]>("Doc Quality — Storybook only", {
  data: () =>
    tasks.map((task) => ({
      input: task,
      expected: task.expected.implementation,
    })),
  task: async (task) => {
    const { text } = await generateText({
      model: getAgentModel(),
      tools: storybookTools,
      stopWhen: isStepCount(10),
      prompt: task.prompt,
    });
    return text;
  },
  scorers: [implementationScorer],
});
