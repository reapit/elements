import preview from "#.storybook/preview";

import { AppSwitcher } from "../app-switcher";

const meta = preview.meta({
  title: "Navigation/AppSwitcher/MenuItem",
  component: AppSwitcher.MenuItem,
});

/**
 * A basic menu item that renders an avatar, product name, and supplementary info. All content is supplied
 * directly as props — the avatar slot accepts any React node, allowing consumers to provide their own
 * product logo or placeholder.
 */
export const Example = meta.story({
  args: {
    appName: "App name",
    avatar: (
      <div
        aria-hidden
        style={{ background: "currentColor", borderRadius: 4, height: 32, width: 32 }}
      />
    ),
    supplementaryInfo: "Supplementary info",
    href: "#",
  },
});

/**
 * If the text content of the menu item is too long for the available space, it will wrap to the next line.
 */
export const Wrapping = Example.extend({
  decorators: [
    (Story) => (
      <div style={{ boxSizing: "content-box", border: "1px solid #FA00FF", width: "180px" }}>
        <Story />
      </div>
    ),
  ],
});

/**
 * If individual words are too long for the available space, mid-word breaks may occur. This ensures no overflow
 * occurs, though this scenario should prove to be a rare occurrence given we have direct control of the product
 * name and supplementary info content.
 */
export const WordBreaks = Example.extend({
  decorators: [
    (Story) => (
      <div style={{ boxSizing: "content-box", border: "1px solid #FA00FF", width: "150px" }}>
        <Story />
      </div>
    ),
  ],
});
