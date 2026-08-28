import { defineBrowserCommand } from "@vitest/browser-playwright";

/** Where the test page, the Vite dev server and the whole module graph are served from. */
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

/**
 * Google Fonts, which `src/styles/globals.css` imports Inter and Source Code Pro from. Text set in
 * Inter and the same text set in the fallback stack are different images, so these two hosts are
 * the exception to the rule below rather than a candidate for stubbing.
 */
const FONT_HOSTS = new Set(["fonts.googleapis.com", "fonts.gstatic.com"]);

/**
 * Top-level domains reserved for documentation and testing, and which by design never resolve. A
 * story pointing an `<img>` at one is asking for a load to fail, because the failure is the state
 * it exists to capture, so these are let fail rather than stubbed.
 */
const UNRESOLVABLE_TLDS = new Set(["example", "invalid", "test"]);

/**
 * A 1×1 magenta PNG, stretched by the browser to whatever box the story lays out for it. The layout
 * is exercised as usual and the pixels are the same on every run; magenta rather than a plausible
 * grey so that a baseline reviewed by eye reads unmistakably as a stub, and so that a served
 * placeholder stays distinguishable from an image that failed to load.
 */
const PLACEHOLDER_IMAGE = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR42mP4z/AfAAQAAf8c9+lcAAAAAElFTkSuQmCC",
  "base64",
);

/**
 * Cuts the visual suite off from the network, so that a baseline is a function of the code and
 * nothing else.
 *
 * Several stories point `<img>` at a stock photo service. Left alone they make a blocking CI job
 * depend on a third party being up and fast: a slow response gives a screenshot taken before the
 * image painted, and an outage gives a wall of red that says nothing about any component. Serving
 * those images from here removes both without giving up the coverage, which tagging the stories
 * `!visual` would have done.
 */
export const stubExternalRequests = defineBrowserCommand(async ({ page }) => {
  await page.route("**/*", (route) => {
    const request = route.request();
    const { hostname } = new URL(request.url());

    if (LOCAL_HOSTS.has(hostname) || FONT_HOSTS.has(hostname)) {
      return route.continue();
    }

    const isUnresolvable = UNRESOLVABLE_TLDS.has(hostname.split(".").at(-1) ?? "");

    return request.resourceType() === "image" && !isUnresolvable
      ? route.fulfill({ body: PLACEHOLDER_IMAGE, contentType: "image/png" })
      : route.abort();
  });
});

declare module "vitest/internal/browser" {
  interface BrowserCommands {
    stubExternalRequests: () => Promise<void>;
  }
}
