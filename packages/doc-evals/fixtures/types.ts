export interface EvalTask {
  id: string;
  prompt: string;
  /**
   * Criteria lists for each scenario. Each entry is a natural-language assertion
   * that the judge LLM evaluates as met or unmet against the agent output.
   *
   * - selection: design-level criteria (ZeroHeight scenario) — which components, why, which to avoid
   * - implementation: code-level criteria (Storybook scenario) — correct imports, props, composition
   */
  expected: {
    selection: string[];
    implementation: string[];
  };
}
