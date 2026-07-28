import preview from "#.storybook/preview";

import { TagGroup } from "./tag-group";

const meta = preview.meta({
  title: "Indicators and status/TagGroup",
  component: TagGroup,
  argTypes: {
    children: {
      control: "radio",
      options: ["One", "Some", "Many"],
      mapping: {
        One: <TagGroup.Item>Tag 1</TagGroup.Item>,
        Some: [
          <TagGroup.Item key="1">Tag 1</TagGroup.Item>,
          <TagGroup.Item key="2">Tag 2</TagGroup.Item>,
        ],
        Many: [
          <TagGroup.Item key="1">Tag 1</TagGroup.Item>,
          <TagGroup.Item key="2">Tag 2</TagGroup.Item>,
          <TagGroup.Item key="3">Tag 3</TagGroup.Item>,
          <TagGroup.Item key="4">Tag 4</TagGroup.Item>,
          <TagGroup.Item key="5">Tag 5</TagGroup.Item>,
        ],
      },
    },
  },
});

export const Example = meta.story({
  args: {
    children: "Many",
    flow: "wrap",
    overflow: "visible",
  },
});

/**
 * By default, tags within the tag group will wrap to the next line if the container is too small.
 */
export const Wrapping = meta.story({
  args: {
    children: "Many",
  },
  decorators: [
    (Story) => (
      <div style={{ boxSizing: "content-box", border: "1px solid #FA00FF", width: "200px" }}>
        <Story />
      </div>
    ),
  ],
});

/**
 * The default wrapping behaviour can be overridden by setting `flow="nowrap"`. This is often
 * useful when using a tag group within the context of an element that does not want its content
 * wrapping, such as a single-line table cell.
 */
export const NoWrapping = Wrapping.extend({
  args: {
    flow: "nowrap",
  },
  decorators: Wrapping.input.decorators,
});

/**
 * When wrapping is disabled, the overflow behaviour can also be configured using `overflow`. By
 * default, it will be `visible`, but `auto` can be used to allow scrolling if the content does
 * overflow.
 */
export const Overflow = NoWrapping.extend({
  args: {
    flow: "nowrap",
    overflow: "auto",
  },
  decorators: NoWrapping.input.decorators,
});
