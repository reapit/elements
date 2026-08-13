import preview from "#.storybook/preview";

import { AvatarGroup } from "./avatar-group";

const meta = preview.meta({
  title: "Content display/AvatarGroup/OverflowItem",
  component: AvatarGroup.OverflowItem,
});

/**
 * Unlike `AvatarGroup.Item`, an overflow item's border colour cannot be overridden; it always renders with
 * a white border.
 */
export const Example = meta.story({
  args: {
    count: 3,
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
 * `count` of `0` or less renders nothing, so `AvatarGroup.OverflowItem` can always be rendered alongside a
 * conditionally-computed count without an extra check at the call site.
 */
export const NoOverflow = Example.extend({
  args: {
    count: 0,
  },
});
