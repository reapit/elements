import { page } from "@vitest/browser/context";
import { isStory } from "storybook/internal/csf";

/**
 * Registers one screenshot test per story in a component's stories module.
 *
 * ```ts
 * // src/core/button/__tests__/button.visual.test.tsx
 * import { testStoryScreenshots } from "#src/tests/visual";
 *
 * import * as stories from "../button.stories";
 *
 * testStoryScreenshots(stories);
 * ```
 *
 * Each story renders into its own container and the container is what gets captured, not the
 * page. That keeps a baseline to the size of the component and stops an unrelated change to
 * layout elsewhere on the page from rewriting every file.
 *
 * Stories run through `story.run()` rather than being rendered directly, so their loaders,
 * `beforeEach` and `play` functions all execute, and the preview's decorators apply, the
 * `ThemeProvider` among them. A story whose `play` opens a menu or focuses a field is therefore
 * screenshotted in that state, which is usually the state worth capturing.
 */
export function testStoryScreenshots(storiesModule: Record<string, unknown>): void {
  let found = 0;

  for (const [exportName, story] of Object.entries(storiesModule)) {
    if (!isStory(story)) {
      continue;
    }

    found += 1;

    // The test name and the baseline filename both come from the export name. A factory story's
    // composed `name` is "Unnamed Story" unless the story sets one explicitly, and where a story
    // does set one, rewording it should not orphan a baseline.
    test(exportName, async () => {
      const canvasElement = document.createElement("div");
      document.body.append(canvasElement);
      onTestFinished(() => canvasElement.remove());

      await story.run({ canvasElement });
      await waitForStableRender(canvasElement);

      await expect(page.elementLocator(canvasElement)).toMatchScreenshot(toKebabCase(exportName));
    });
  }

  // A file that registers nothing passes, which is the one outcome a regression suite must never
  // quietly produce. The likeliest cause is a stories module still written in the older
  // default-export CSF format, which exports no story objects for the loop above to find.
  if (found === 0) {
    throw new Error(
      "No stories found. testStoryScreenshots needs a module whose stories are written with " +
        "`preview.meta({ ... }).story({ ... })`.",
    );
  }
}

/**
 * Waits for the two things a screenshot depends on that the story lifecycle does not itself await.
 *
 * Fonts, because `src/styles/globals.css` pulls Inter and Source Code Pro over the network, and
 * text laid out in the fallback stack is a visibly different image from the same text in Inter.
 *
 * Images, because `vitest.visual.commands.ts` serves every off-origin image from a local stub: they
 * arrive quickly, but still asynchronously. `decode()` rejects for an image that cannot be decoded,
 * which some stories render deliberately, so a rejection here is an outcome rather than a failure.
 */
async function waitForStableRender(canvasElement: HTMLElement): Promise<void> {
  await document.fonts.ready;

  await Promise.all(
    Array.from(canvasElement.querySelectorAll("img")).map((image) =>
      image.decode().catch(() => undefined),
    ),
  );
}

/** `"WithIconLeft"` to `"with-icon-left"`, so baseline filenames stay lowercase and hyphenated. */
function toKebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}
