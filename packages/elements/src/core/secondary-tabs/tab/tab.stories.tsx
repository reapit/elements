import preview from "#.storybook/preview";
import { Badge } from "#src/core/badge";

import { SecondaryTab } from "./tab";

const meta = preview.meta({
  title: "Navigation/SecondaryTabs/Tab",
  component: SecondaryTab,
  argTypes: {
    "aria-disabled": {
      control: "boolean",
    },
    badge: {
      control: "radio",
      options: ["None", "Count"],
      mapping: {
        None: null,
        Count: <Badge colour="inactive">14</Badge>,
      },
    },
  },
});

export const Example = meta.story({
  args: {
    "aria-current": false,
    children: "Secondary tab",
    href: "#",
  },
});

/**
 * When the tab represents the current page, `aria-current="page"` should be supplied to communicate to
 * visual and accessible users that the tab is currently "selected". This shows the blue bottom border.
 */
export const Selected = Example.extend({
  args: {
    "aria-current": "page",
  },
});

/**
 * A badge can be shown at the end of the tab, after its label.
 */
export const WithBadge = Example.extend({
  args: {
    badge: <Badge colour="inactive">14</Badge>,
  },
});

/**
 * Since tabs are always rendered as links, `aria-disabled` is used to disable a tab rather than the
 * native `disabled` attribute (which anchors don't support). The tab remains focusable while disabled.
 */
export const Disabled = Example.extend({
  args: {
    "aria-disabled": true,
  },
});
