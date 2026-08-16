import preview from "#.storybook/preview";
import { Badge } from "#src/core/badge";
import { PropertyIcon } from "#src/icons/property";

import { PrimaryTabs } from "./primary-tabs";

const href = "#";

const meta = preview.meta({
  title: "Navigation/PrimaryTabs",
  component: PrimaryTabs,
  argTypes: {
    children: {
      control: "radio",
      options: ["No selected tab", "Selected tab", "Icons", "Badges", "Disabled tabs"],
      mapping: {
        "No selected tab": buildTabs("No selected tab"),
        "Selected tab": buildTabs("Selected tab"),
        Icons: buildTabs("Selected tab", { withIcons: true }),
        Badges: buildTabs("Selected tab", { withBadges: true }),
        "Disabled tabs": buildTabs("Selected tab", { withDisabled: true }),
      },
    },
    justifyContent: {
      control: "radio",
      options: ["start", "stretch"],
      mapping: {
        start: "start",
        stretch: "stretch",
      },
    },
    overflow: {
      control: "radio",
      options: ["scroll", "visible"],
      mapping: {
        scroll: "scroll",
        visible: "visible",
      },
    },
  },
});

export const Example = meta.story({
  args: {
    children: "No selected tab",
    justifyContent: "start",
  },
});

/**
 * If a tab represents the current page/section, it should be marked as "selected" with aria-current="page".
 */
export const SelectedTab = meta.story({
  args: {
    children: "Selected tab",
  },
});

/**
 * Ideally, overflowing should be avoided as much as possible. When it can’t be avoided (e.g. small
 * breakpoints) use horizontal scrolling by providing `overflow="scroll"`. By default, tabs will simply
 * overflow the container.
 */
export const Overflow = meta.story({
  args: {
    children: "Selected tab",
    overflow: "scroll",
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ border: "1px solid #FA00FF", width: "397px" }}>
          <Story />
        </div>
      );
    },
  ],
});

/**
 * With `justifyContent="stretch"`, tabs stretch to equally fill the available width, rather than
 * sizing to their content.
 */
export const Justified = meta.story({
  args: {
    children: "Selected tab",
    justifyContent: "stretch",
  },
});

/**
 * Each `PrimaryTabs.Item` can show a start icon alongside its label.
 */
export const Icons = meta.story({
  args: {
    children: "Icons",
  },
});

/**
 * Each `PrimaryTabs.Item` can show an end badge alongside its label.
 */
export const Badges = meta.story({
  args: {
    children: "Badges",
  },
});

/**
 * Setting `aria-disabled` makes a tab appear disabled and ignore click events, while remaining
 * focusable.
 */
export const Disabled = meta.story({
  args: {
    children: "Disabled tabs",
  },
});

function buildTabs(
  type: "No selected tab" | "Selected tab",
  {
    withIcons = false,
    withBadges = false,
    withDisabled = false,
  }: { withIcons?: boolean; withBadges?: boolean; withDisabled?: boolean } = {},
) {
  const icon = withIcons ? <PropertyIcon /> : undefined;
  const badge = withBadges ? <Badge colour="inactive">14</Badge> : undefined;

  // Peaches and Watermelon showcase icon + badge together (and disabled, where relevant) so
  // that no single story implies icons and badges are mutually exclusive.
  const showsCombo = withIcons || withBadges || withDisabled;
  const comboIcon = showsCombo ? <PropertyIcon /> : undefined;
  const comboBadge = showsCombo ? <Badge colour="inactive">14</Badge> : undefined;

  return [
    <PrimaryTabs.Item
      key="apples"
      href={href}
      aria-current={type === "Selected tab" ? "page" : false}
      icon={icon}
    >
      Apples
    </PrimaryTabs.Item>,
    <PrimaryTabs.Item key="bananas" aria-current={false} href={href} badge={badge}>
      Bananas
    </PrimaryTabs.Item>,
    <PrimaryTabs.Item
      key="peaches"
      aria-current={false}
      href={href}
      icon={comboIcon}
      badge={comboBadge}
      aria-disabled={withDisabled}
    >
      Peaches
    </PrimaryTabs.Item>,
    <PrimaryTabs.Item key="strawberries" aria-current={false} href={href}>
      Strawberries
    </PrimaryTabs.Item>,
    <PrimaryTabs.Item
      key="watermelon"
      aria-current={false}
      href={href}
      icon={comboIcon}
      badge={comboBadge}
      aria-disabled={withDisabled}
    >
      Watermelon
    </PrimaryTabs.Item>,
  ];
}
