import { defineConfig } from "evalite/config";

export default defineConfig({
  // LLM agent calls can be slow — allow up to 5 minutes per task before timing out.
  testTimeout: 300_000,
  // One concurrent run per eval suite (storybook.eval.ts and zeroheight.eval.ts).
  // Increase this value as more suites are added.
  maxConcurrency: 3,
});
