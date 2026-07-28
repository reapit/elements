import { buildAnchorPositioningCSS } from "../build-anchor-positioning-css";
import { mapPlacementToCSS } from "../map-placement-to-css";

vi.mock("../map-placement-to-css");
vi.mocked(mapPlacementToCSS).mockReturnValue("/* mocked positioning css */");

test("calls mapPlacementToCSS", () => {
  buildAnchorPositioningCSS({
    anchorElementId: "anchor",
    gap: "var(--fake-gap)",
    maxWidth: "var(--fake-max-width)",
    minWidth: "var(--fake-min-width)",
    placement: "top-start",
    position: "absolute",
    positionedElementId: "positioned-element",
    positionTryFallbacks: "flip-block",
  });

  expect(mapPlacementToCSS).toHaveBeenCalledWith({
    gap: "var(--fake-gap)",
    placement: "top-start",
  });
});

test("produces CSS for the anchor element and positioned element", () => {
  expect(
    buildAnchorPositioningCSS({
      anchorElementId: ":r1:", // simulate a `useId` string
      gap: "var(--fake-gap)",
      maxWidth: "var(--fake-max-width)",
      minWidth: "var(--fake-min-width)",
      placement: "top-start",
      position: "absolute",
      positionedElementId: "positioned-element",
      positionTryFallbacks: "flip-block, flip-inline",
    }),
  ).toMatchInlineSnapshot(`
    "
        #\\:r1\\: {
          anchor-name: --\\:r1\\:;
        }

        #positioned-element {
          position: absolute;
          position-anchor: --\\:r1\\:;
          position-try-fallbacks: flip-block, flip-inline;
          max-width: var(--fake-max-width);
          min-width: var(--fake-min-width);
          /* mocked positioning css */
        }
      "
  `);
});

test("handles position: fixed", () => {
  expect(
    buildAnchorPositioningCSS({
      anchorElementId: ":r1:", // simulate a `useId` string
      gap: "var(--fake-gap)",
      placement: "top-start",
      position: "fixed",
      positionedElementId: "positioned-element",
      positionTryFallbacks: "flip-block, flip-inline",
    }),
  ).toMatchInlineSnapshot(`
    "
        #\\:r1\\: {
          anchor-name: --\\:r1\\:;
        }

        #positioned-element {
          position: fixed;
          position-anchor: --\\:r1\\:;
          position-try-fallbacks: flip-block, flip-inline;
          ${"" /* max width; this is needed to prevent prettier removing the whitespace */}
          ${"" /* min width; this is needed to prevent prettier removing the whitespace */}
          /* mocked positioning css */
        }
      "
  `);
});

test("defaults position to fixed when omitted", () => {
  expect(
    buildAnchorPositioningCSS({
      anchorElementId: ":r1:",
      gap: "var(--fake-gap)",
      placement: "top-start",
      positionedElementId: "positioned-element",
      positionTryFallbacks: "none",
    }),
  ).toMatchInlineSnapshot(`
    "
        #\\:r1\\: {
          anchor-name: --\\:r1\\:;
        }

        #positioned-element {
          position: fixed;
          position-anchor: --\\:r1\\:;
          position-try-fallbacks: none;
          ${"" /* max width; this is needed to prevent prettier removing the whitespace */}
          ${"" /* min width; this is needed to prevent prettier removing the whitespace */}
          /* mocked positioning css */
        }
      "
  `);
});

test("handles undefined max and min widths", () => {
  expect(
    buildAnchorPositioningCSS({
      anchorElementId: ":r1:", // simulate a `useId` string
      gap: "var(--fake-gap)",
      placement: "top-start",
      position: "absolute",
      positionedElementId: "positioned-element",
      positionTryFallbacks: "flip-block, flip-inline",
    }),
  ).toMatchInlineSnapshot(`
    "
        #\\:r1\\: {
          anchor-name: --\\:r1\\:;
        }

        #positioned-element {
          position: absolute;
          position-anchor: --\\:r1\\:;
          position-try-fallbacks: flip-block, flip-inline;
          ${"" /* max width; this is needed to prevent prettier removing the whitespace */}
          ${"" /* min width; this is needed to prevent prettier removing the whitespace */}
          /* mocked positioning css */
        }
      "
  `);
});
