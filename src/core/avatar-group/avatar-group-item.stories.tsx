import preview from "#.storybook/preview";

import { AvatarGroup } from "./avatar-group";

const meta = preview.meta({
  title: "Content display/AvatarGroup/Item",
  component: AvatarGroup.Item,
  argTypes: {
    children: {
      control: "text",
    },
  },
});

export const Example = meta.story({
  args: {
    children: "AB",
  },
  decorators: [
    (Story) => (
      <AvatarGroup>
        <Story />
      </AvatarGroup>
    ),
  ],
});

/**
 * By default, an item's colour and shape are set by the group, and its border colour defaults to white.
 * Each can be overridden on individual items, for example to give a specific avatar a status-coloured
 * border. Here, the second item overrides `borderColour`, `colour`, and `shape`, while the first uses the
 * defaults.
 */
export const Overrides = meta.story({
  argTypes: {
    children: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <AvatarGroup colour="primary" shape="circle">
        <Story />
      </AvatarGroup>
    ),
  ],
  render: () => (
    <>
      <AvatarGroup.Item>AB</AvatarGroup.Item>
      <AvatarGroup.Item
        borderColour="--colour-border-action-default"
        colour="default"
        shape="square"
      >
        CD
      </AvatarGroup.Item>
    </>
  ),
});
