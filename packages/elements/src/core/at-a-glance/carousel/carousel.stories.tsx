import preview from "#.storybook/preview";

import { buildCards } from "../__story__/build-cards";
import { AtAGlance } from "../at-a-glance";

const meta = preview.meta({
  title: "Content display/AtAGlance/Carousel",
  component: AtAGlance.Carousel,
  argTypes: {
    children: { control: false },
    columns: { control: "text" },
    gap: { control: "text" },
  },
});

export const Example = meta.story({
  args: {
    children: buildCards({ layout: "horizontal", variant: "with-link" }),
    columns: "var(--size-60)",
    gap: undefined,
  },
});

/**
 * The carousel is only scrollable, and the next/previous buttons visible, when the cards
 * overflow its containing block.
 */
export const NoOverflow = meta.story({
  args: {
    children: buildCards({ count: 2 }),
    columns: "var(--size-60)",
  },
});
