// ZeroHeight-only scenario: the agent has access to ZeroHeight design documentation only.
// Scored on component selection quality: correct component chosen, anti-patterns avoided, variants understood.
// Use this suite to identify gaps in the ZeroHeight design guidance.
import { generateText, isStepCount } from "ai";
import { evalite } from "evalite";

import type { EvalTask } from "./fixtures/tasks.js";
import { tasks } from "./fixtures/tasks.js";
import { getAgentModel } from "./model.js";
import { selectionScorer } from "./scorers/selection.js";
import { zeroHeightTools } from "./tools/zeroheight.js";

evalite<EvalTask, string, string[]>("Doc Quality — ZeroHeight only", {
  data: () =>
    tasks.map((task) => ({
      input: task,
      expected: task.expected.selection,
    })),
  task: async (task) => {
    const { text } = await generateText({
      model: getAgentModel(),
      tools: zeroHeightTools,
      stopWhen: isStepCount(10),
      prompt: task.prompt,
    });
    return text;
  },
  scorers: [selectionScorer],
});
