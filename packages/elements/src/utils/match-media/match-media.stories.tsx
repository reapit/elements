import preview from "#.storybook/preview";
import { Pattern } from "#src/core/drawer/__story__/Pattern";
import { isWidthAtOrAbove } from "#src/utils/breakpoints";

import { MatchMedia } from "./match-media";

const meta = preview.meta({
  title: "Utils/MatchMedia",
  component: MatchMedia,
  argTypes: {
    condition: {
      control: "text",
    },
    children: {
      control: false,
    },
  },
});

/**
 * A common use case is when content rendered by a component should only be visible at certain screen sizes. In this
 * example, the pretty pattern will only be visible if your browser viewport is larger than the `MD` breakpoint.
 */
export const Example = meta.story({
  args: {
    children: <Pattern height="100px" />,
    condition: isWidthAtOrAbove("MD"),
  },
});

/**
 * But any valid media query condition can be specified, whether it's `(prefers-color-scheme: light)` or
 * `(orientation: landscape)`. In this example, the content will only be visible if the user has `light` mode enabled
 * in their system preferences.
 */
export const OtherUses = meta.story({
  args: {
    condition: "(prefers-color-scheme: light)",
    children: <Pattern height="100px" />,
  },
});
