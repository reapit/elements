import type { Decorator } from "@storybook/react-vite";

import preview from "#.storybook/preview";

import * as ChipStories from "../chip/chip.stories";
import { ChipGroup } from "./chip-group";

const meta = preview.meta({
  title: "Indicators and status/ChipGroup",
  component: ChipGroup,
  argTypes: {
    children: {
      control: "radio",
      defaultValue: "Fruit",
      options: ["Fruit", "Colours"],
      mapping: {
        Fruit: [
          <ChipGroup.Item key="1">Apples</ChipGroup.Item>,
          <ChipGroup.Item key="2">Bananas</ChipGroup.Item>,
          <ChipGroup.Item key="3">Oranges</ChipGroup.Item>,
          <ChipGroup.Item key="4">Peanuts</ChipGroup.Item>,
          <ChipGroup.Item key="5">Strawberries</ChipGroup.Item>,
          <ChipGroup.Item key="6">Watermelons</ChipGroup.Item>,
        ],
        Colours: [
          <ChipGroup.Item key="1">Red</ChipGroup.Item>,
          <ChipGroup.Item key="2">Blue</ChipGroup.Item>,
          <ChipGroup.Item key="3">Yellow</ChipGroup.Item>,
          <ChipGroup.Item key="4">Pink</ChipGroup.Item>,
          <ChipGroup.Item key="5">Black</ChipGroup.Item>,
          <ChipGroup.Item key="6">White</ChipGroup.Item>,
        ],
      },
    },
    overflow: {
      control: "radio",
    },
    variant: {
      control: "radio",
      options: ["filter", "selection"],
    },
  },
});

const useNarrowParentDecorator: Decorator = (Story) => {
  return (
    <div style={{ border: "1px solid #FA00FF", width: "397px" }}>
      <Story />
    </div>
  );
};

/**
 * By default, a chip group will grow to whatever width it's parent allows.
 */
export const Example = meta.story({
  args: {
    "aria-disabled": false,
    children: "Fruit",
    disabled: false,
    flow: "wrap",
    overflow: "visible",
    variant: "filter",
  },
});

/**
 * All chips in the group can be disabled. Individual chips can override the group's disabled state;
 * `aria-disabled` works the same way.
 */
export const Disabled = Example.extend({
  args: {
    children: [
      <ChipGroup.Item key="1">Apples</ChipGroup.Item>,
      <ChipGroup.Item key="2">Bananas</ChipGroup.Item>,
      <ChipGroup.Item key="3" aria-disabled={false} disabled={false}>
        Oranges
      </ChipGroup.Item>,
      <ChipGroup.Item key="4">Peanuts</ChipGroup.Item>,
      <ChipGroup.Item key="5">Strawberries</ChipGroup.Item>,
      <ChipGroup.Item key="6">Watermelons</ChipGroup.Item>,
    ],

    disabled: true,
  },
});

/**
 * The variant of all chips in the group can be set using `variant`.
 */
export const Variants = Example.extend({
  args: {
    variant: "selection",
  },
});

/**
 * By default, chips will wrap to other lines if there is insufficient space.
 */
export const Wrapping = Example.extend({
  decorators: [useNarrowParentDecorator],
});

/**
 * The default wrapping behaviour can be overridden using `flow="nowrap"`. This can be useful at
 * small breakpoints where the chip group should not occupy too much vertical space.
 */
export const NoWrapping = Example.extend({
  args: {
    flow: "nowrap",
  },
  decorators: [useNarrowParentDecorator],
});

/**
 * When wrapping is disabled, it will often be useful to allow the chip group to scroll horizontally.
 */
export const Overflow = NoWrapping.extend({
  args: {
    overflow: "auto",
  },
  decorators: [useNarrowParentDecorator],
});

/**
 * Whether wrapping or scrolling is used, chips will size themselves appropriately based on the
 * length of their label.
 */
export const ChipSizing = meta.story({
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    children: [
      <ChipGroup.Item key="1" {...ChipStories.FilterChip.input.args}>
        Chip 1
      </ChipGroup.Item>,
      <ChipGroup.Item key="2" {...ChipStories.Disabled.input.args}>
        Chip 2
      </ChipGroup.Item>,
      <ChipGroup.Item key="3" {...ChipStories.FilterChip.input.args}>
        Chip 3
      </ChipGroup.Item>,
      <ChipGroup.Item key="4" {...ChipStories.FilterChip.input.args}>
        Chip 4
      </ChipGroup.Item>,
      <ChipGroup.Item key="5" {...ChipStories.Truncation.input.args}>
        Truncation can be applied to ensure a long chip label does not wrap to a second line
      </ChipGroup.Item>,
      <ChipGroup.Item key="6" {...ChipStories.Disabled.input.args}>
        Chip 5
      </ChipGroup.Item>,
      <ChipGroup.Item key="7" {...ChipStories.FilterChip.input.args}>
        Chip 6
      </ChipGroup.Item>,
      <ChipGroup.Item key="8" {...ChipStories.Wrapping.input.args}>
        Or, you can avoid truncation and allow a long chip label to wrap to multiple lines
      </ChipGroup.Item>,
      <ChipGroup.Item key="9" {...ChipStories.LongWords.input.args} />,
    ],
    flow: "wrap",
    variant: "filter",
  },
  decorators: [useNarrowParentDecorator],
});
