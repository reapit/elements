import preview from "#.storybook/preview";

import { SecondaryTabs } from "./secondary-tabs";

const href = "#";

const meta = preview.meta({
  title: "Navigation/SecondaryTabs",
  component: SecondaryTabs,
  argTypes: {
    children: {
      control: "radio",
      options: ["No selected tab", "Selected tab"],
      mapping: {
        "No selected tab": buildTabs("No selected tab"),
        "Selected tab": buildTabs("Selected tab"),
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

function buildTabs(type: "No selected tab" | "Selected tab") {
  return [
    <SecondaryTabs.Item
      key="apples"
      href={href}
      aria-current={type === "Selected tab" ? "page" : false}
    >
      Apples
    </SecondaryTabs.Item>,
    <SecondaryTabs.Item key="bananas" aria-current={false} href={href}>
      Bananas
    </SecondaryTabs.Item>,
    <SecondaryTabs.Item key="peaches" aria-current={false} href={href}>
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
