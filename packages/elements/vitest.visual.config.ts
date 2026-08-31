import path from "node:path";

import { playwright } from "@vitest/browser-playwright";
import { defineProject, mergeConfig } from "vitest/config";

import vitestConfig from "./vitest.config";
import { stubExternalRequests } from "./vitest.visual.commands";

// Merging `vitestConfig` here (rather than `extends: true`) is what pulls the build's `plugins`
// (svgr, wyw-in-js) into this project; see the comment in `vitest.config.ts`.
export default mergeConfig(
  vitestConfig,
  defineProject({
    test: {
      name: "visual",
      browser: {
        // Playwright's request interception is a server-side API, so the routing that keeps
        // baselines off the network has to be registered from a browser command.
        commands: { stubExternalRequests },
        enabled: true,
        expect: {
          toMatchScreenshot: {
            // Vitest defaults to nesting baselines in a directory named after the test file.
            // There is one visual test file per component, so that directory would only ever
            // hold one set; drop it and keep the baselines directly in `__screenshots__/`.
            resolveScreenshotPath: ({
              arg,
              browserName,
              ext,
              platform,
              root,
              screenshotDirectory,
              testFileDirectory,
            }) =>
              path.join(
                root,
                testFileDirectory,
                screenshotDirectory,
                `${arg}-${browserName}-${platform}${ext}`,
              ),
          },
        },
        headless: true,
        instances: [{ browser: "chromium" }],
        provider: playwright(),
        // 1024 is the MD breakpoint minimum, matching the "MD (Desktop)" entry in
        // `.storybook/preview.tsx`'s viewport list, so a baseline can be reproduced by eye in
        // Storybook by picking that viewport from the toolbar.
        viewport: { height: 900, width: 1024 },
      },
      globalSetup: ["vitest.visual.global-setup.ts"],
      globals: true,
      include: ["src/**/*.visual.test.ts?(x)"],
      setupFiles: ["vitest.visual.setup.ts"],
    },
  }),
);
