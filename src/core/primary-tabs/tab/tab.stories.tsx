import preview from "#.storybook/preview";
import { Badge } from "#src/core/badge";
import { PropertyIcon } from "#src/icons/property";

import { PrimaryTab } from "./tab";

const meta = preview.meta({
  title: "Navigation/PrimaryTabs/Tab",
  component: PrimaryTab,
  argTypes: {
    badge: {
      control: "radio",
      options: ["None", "Badge"],
      mapping: {
        None: undefined,
        Badge: <Badge colour="inactive">14</Badge>,
      },
    },
    icon: {
      control: "radio",
      options: ["None", "Property"],
      mapping: {
        None: undefined,
        Property: <PropertyIcon />,
      },
    },
  },
});

export const Example = meta.story({
  args: {
    "aria-current": false,
    children: "Primary tab",
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
 * A tab can show a start icon, an end badge, or both, alongside its label.
 */
export const IconAndBadge = Example.extend({
  args: {
    badge: <Badge colour="inactive">14</Badge>,
    icon: <PropertyIcon />,
  },
});

/**
 * Setting `aria-disabled` makes the tab appear disabled and ignore click events, while remaining
 * focusable.
 */
export const Disabled = Example.extend({
  args: {
    "aria-disabled": true,
  },
});
