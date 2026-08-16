import preview from "#.storybook/preview";
import { Badge } from "#src/core/badge";

import { SecondaryTabs } from "./secondary-tabs";

const href = "#";

const meta = preview.meta({
  title: "Navigation/SecondaryTabs",
  component: SecondaryTabs,
  argTypes: {
    children: {
      control: "radio",
      options: ["No selected tab", "Selected tab", "With badges", "With disabled tab"],
      mapping: {
        "No selected tab": buildTabs("No selected tab"),
        "Selected tab": buildTabs("Selected tab"),
        "With badges": buildTabs("With badges"),
        "With disabled tab": buildTabs("With disabled tab"),
      },
    },
    overflow: {
      control: "radio",
      options: ["scroll", "undefined"],
      mapping: {
        scroll: "scroll",
        undefined: undefined,
      },
    },
  },
});

export const Example = meta.story({
  args: {
    children: "No selected tab",
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
 * Tabs can show a badge at the end of their label.
 */
export const Badges = meta.story({
  args: {
    children: "With badges",
  },
});

/**
 * Tabs can be disabled using `aria-disabled` (since tabs are always rendered as links, which don't
 * support the native `disabled` attribute).
 */
export const Disabled = meta.story({
  args: {
    children: "With disabled tab",
  },
});

/**
 * Ideally, overflowing should be avoided as much as possible. When it can't be avoided (e.g. small
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

type TabsType = "No selected tab" | "Selected tab" | "With badges" | "With disabled tab";

function buildTabs(type: TabsType) {
  return [
    <SecondaryTabs.Item
      key="apples"
      href={href}
      aria-current={type === "Selected tab" ? "page" : false}
      badge={type === "With badges" ? <Badge colour="inactive">3</Badge> : undefined}
    >
      Apples
    </SecondaryTabs.Item>,
    <SecondaryTabs.Item
      key="bananas"
      aria-current={false}
      href={href}
      badge={type === "With badges" ? <Badge colour="inactive">12</Badge> : undefined}
    >
      Bananas
    </SecondaryTabs.Item>,
    <SecondaryTabs.Item
      key="peaches"
      aria-current={false}
      href={href}
      aria-disabled={type === "With disabled tab" ? true : undefined}
    >
      Peaches
    </SecondaryTabs.Item>,
    <SecondaryTabs.Item key="strawberries" aria-current={false} href={href}>
      Strawberries
    </SecondaryTabs.Item>,
    <SecondaryTabs.Item key="watermelon" aria-current={false} href={href}>
      Watermelon
    </SecondaryTabs.Item>,
  ];
}
