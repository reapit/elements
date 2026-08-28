# Visual Regression Architecture

This document explains how a Storybook story becomes a committed baseline PNG, and which file
owns which part of that path. Two adjacent concerns live elsewhere: the invariants that make a
baseline reproducible between a laptop and a CI runner are in
[`.github/CI.md`](../../../../.github/CI.md), and capturing screenshots to illustrate a pull
request, a separate job with separate rules, is the
[`capturing-visual-changes`](../../../../.claude/skills/capturing-visual-changes/SKILL.md) skill.

## Overview

The suite is a second Vitest project, `visual`, declared beside the `unit` project in
[`vite.config.ts`](../../vite.config.ts). It renders the same stories Storybook renders, in
headless Chromium through Vitest's browser mode, and compares each against a PNG committed beside
the component under `__screenshots__/`.

Seven pieces coordinate to do that:

| File                                                                   | Responsibility                                                                   |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [`scripts/test-visual.sh`](../../../../scripts/test-visual.sh)         | Wraps a local run in the pinned Playwright container, the only supported way in. |
| [`vite.config.ts`](../../vite.config.ts)                               | Declares the `visual` project: browser, viewport, and baseline path resolution.  |
| [`vitest.visual.global-setup.ts`](../../vitest.visual.global-setup.ts) | Fails the run early on a non-Linux platform or unfetched LFS objects.            |
| [`vitest.visual.commands.ts`](../../vitest.visual.commands.ts)         | Routes the page's requests, so a baseline is a function of the code alone.       |
| [`vitest.visual.setup.ts`](../../vitest.visual.setup.ts)               | Loads Storybook's preview and registers that routing, once per test file.        |
| [`visual.ts`](./visual.ts)                                             | Turns a stories module into one screenshot test per story.                       |
| [`tsconfig.visual.json`](../../tsconfig.visual.json)                   | Checks these files against the browser matchers rather than the jest-dom ones.   |

Each file carries its own rationale in a docblock, and this document does not restate them. It
covers what no single file can: the order they run in, and why the work is split across so many.

## Execution order

1. **`yarn test:visual`** at the repo root runs `scripts/test-visual.sh`. The script picks the
   container platform from `uname -m`, mounts the repo at its own host path, and inside the image
   runs `yarn workspace @reapit/elements run test:visual`. That workspace script is a plain
   `vitest run --project=visual`, so it is what CI invokes too; CI supplies the same image through
   its `container:` key instead of through Docker.

2. **`vitest.visual.global-setup.ts`** runs once, before any browser starts. It refuses a
   non-Linux platform, and a clone whose LFS objects are still pointer text. Both would otherwise
   surface as a wall of failed comparisons that says nothing about any component.

3. **Chromium starts** at 1024×900, the MD breakpoint minimum, so a baseline can be reproduced by
   eye in Storybook by picking "MD (Desktop)" from the viewport toolbar. For each test file,
   `vitest.visual.setup.ts` then imports `.storybook/preview` and calls the `stubExternalRequests`
   browser command. Importing the preview from a setup file rather than a test module is what puts
   the `@layer` order declaration ahead of the first component stylesheet.

4. **`visual.ts`** walks the stories module's exports, keeps the ones Storybook marks as stories,
   and registers a test for each. Every test appends its own container to the body, runs the story
   through `story.run()` so that loaders, decorators and `play` functions all execute, waits for
   fonts and for images to decode, then captures the container rather than the page.

5. **`toMatchScreenshot`** resolves the path to
   `<component>/__tests__/__screenshots__/<story>-chromium-linux.png`, and either compares against
   it or, under `--update`, writes it.

## Why the work is split this way

Three of the seven files exist only because of where their code has to run.

`scripts/test-visual.sh` is a wrapper rather than a Vitest option because font rasterisation
decides the pixels. A screenshot taken on macOS differs from the same screenshot taken on a CI
runner, which is enough to fail every comparison, so the container is the boundary the suite has to
sit inside rather than something it can configure from within.

`vitest.visual.commands.ts` is separate from `vitest.visual.setup.ts` because Playwright's request
interception is a server-side API. A setup file runs in the browser and cannot reach it, so the
routing is defined as a browser command, registered in `vite.config.ts`, and invoked from the setup
file across that boundary.

`tsconfig.visual.json` exists because `@vitest/browser/context` augments `expect` with browser
matchers that carry their own vendored jest-dom types. Its `toHaveStyle` overload beats the
`@testing-library/jest-dom` one that every unit test asserting on a CSS custom property depends on,
so the two sets of ambient matchers need separate programs. `check:types` runs both.

## Adding a visual test

One file per component, beside its unit tests:

```tsx
// src/core/button/__tests__/button.visual.test.tsx
import { testStoryScreenshots } from "#src/tests/visual";

import * as stories from "../button.stories";

testStoryScreenshots(stories);
```

Every story in the module is screenshotted; there's no opt-out yet (see the pilot follow-ups for
why one story's baseline might legitimately duplicate another's, and how that should eventually be
excluded).

The stories module must use the CSF factory format, `preview.meta({ ... }).story({ ... })`. A
module still written as a default export registers no tests, and `testStoryScreenshots` throws
rather than passing an empty file.

## Regenerating a baseline

After an intentional change to a component's rendering:

```bash
yarn test:visual --update src/core/button
```

Then look at the resulting PNGs before committing them. `--update` is how an unintended regression
gets blessed into the baseline set, so the diff in the pull request is the only thing standing
between a real bug and a green suite.

Both arguments are optional and independent: no path updates every baseline, and no `--update`
compares without writing. Passing a path alone is the usual way to reproduce a CI failure locally.
