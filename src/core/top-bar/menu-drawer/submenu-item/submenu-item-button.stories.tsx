import preview from "#.storybook/preview";

import { TopBarMenuDrawerSubmenuItemButton } from "./submenu-item-button";

const meta = preview.meta({
  title: "Navigation/TopBar/MenuDrawer/SubmenuItemButton",
  component: TopBarMenuDrawerSubmenuItemButton,
});

export const Example = meta.story({
  args: {
    children: "Logout",
    hasBadge: false,
  },
});

/**
 * A notification badge can be displayed using `hasBadge`.
 */
export const Badge = Example.extend({
  args: {
    hasBadge: true,
  },
});

/**
 * Submenu items should have concise labels. In cases where the label is too long, it will truncate.
 * Care should be taken to ensure this does not happen.
 */
export const Truncation = Example.extend({
  args: {
    children: "All your base are belong to me",
  },
  decorators: [
    (Story) => (
      <div style={{ border: "1px solid #FA00FF", width: "200px" }}>
        <Story />
      </div>
    ),
  ],
});
