/**
 * Two things every visual test file needs before its first story renders: Storybook's preview, and
 * the request routing that keeps the run off the network.
 *
 * Loading the Storybook preview ensures stories render like they do in Storybook itself, including
 * its decorators and initial globals. We do it here rather than in each test module to ensure
 * Elements' stylesheet, and specifically its `@layer` statement, appears before any
 * component-specific stylesheet. This setup file is effectively equivalent to `.storybook/main.ts`.
 *
 * Notably absent is `setProjectAnnotations`: it exists for stories written in the older CSF export
 * format, and `definePreview` already wires up its own project annotations, so there is nothing
 * left for it to do here.
 */
import "#.storybook/preview";
import { commands } from "@vitest/browser/context";

// Once per test file, before its first story renders: routes registered on the page outlive
// individual tests, so there is nothing to tear down between them.
beforeAll(async () => {
  await commands.stubExternalRequests();
});
