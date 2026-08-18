import type { ReactNode } from "react";

import preview from "#.storybook/preview";

import { TopBarMenuDrawer } from "../menu-drawer";

// Placeholder href for all menu items in this story.
const href = "#";

const meta = preview.meta({
  title: "Navigation/TopBar/MenuDrawer/MenuList",
  component: TopBarMenuDrawer.MenuList,
  argTypes: {
    children: {
      control: "radio",
      options: ["No selected item", "Selected item", "Selected submenu item"],
      mapping: {
        "No selected item": buildMenu("No selected item"),
        "Selected item": buildMenu("Selected item"),
        "Selected submenu item": buildMenu("Selected submenu item"),
      },
    },
  },
});

export const Example = meta.story({
  args: {
    children: "No selected item",
  },
});

/**
 * If a menu item represents the current page, it should be marked as "selected". See the `TopBar.MenuItem`
 * documentation for details on how.
 */
export const SelectedItem = meta.story({
  args: {
    children: "Selected item",
  },
});

/**
 * Likewise, if a submenu item represents the current page, it should be marked as "selected". This will
 * automatically cause the parent `TopBar.MenuGroup` to be displayed as "selected" itself. See the
 * `TopBar.MenuSubmenuItem` documentation for details on how.
 */
export const SelectedSubmenuItem = meta.story({
  args: {
    children: "Selected submenu item",
  },
});

/**
 * When there are multiple sibling menu lists, a border will automatically display between them.
 */
export const Border = meta.story({
  args: {
    children: "No selected item",
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Story />
      </>
    ),
  ],
});

function buildMenu(
  type: "No selected item" | "Selected item" | "Selected submenu item",
): ReactNode[] {
  return [
    <TopBarMenuDrawer.MenuList.Item
      key="1"
      aria-current={type === "Selected item" ? "page" : false}
      href={href}
    >
      Menu item 1
    </TopBarMenuDrawer.MenuList.Item>,
    <TopBarMenuDrawer.MenuList.ItemButton key="button" onClick={() => {}}>
      Menu item button
    </TopBarMenuDrawer.MenuList.ItemButton>,
    <TopBarMenuDrawer.MenuList.Group
      key="2"
      summary={
        <TopBarMenuDrawer.MenuList.GroupSummary>Menu item 2</TopBarMenuDrawer.MenuList.GroupSummary>
      }
    >
      <TopBarMenuDrawer.Submenu>
        <TopBarMenuDrawer.Submenu.Item
          aria-current={type === "Selected submenu item" ? "page" : false}
          href={href}
        >
          Submenu item 1
        </TopBarMenuDrawer.Submenu.Item>
        <TopBarMenuDrawer.Submenu.Item aria-current={false} href={href}>
          Submenu item 2
        </TopBarMenuDrawer.Submenu.Item>
      </TopBarMenuDrawer.Submenu>
    </TopBarMenuDrawer.MenuList.Group>,
  ];
}
