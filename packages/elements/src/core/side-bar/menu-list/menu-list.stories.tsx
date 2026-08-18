import preview from "#.storybook/preview";
import { PropertyIcon } from "#src/icons/property";

import { useSideBarContextDecorator } from "../__story__/use-side-bar-context-decorator";
import { useSideBarWidthDecorator } from "../__story__/use-side-bar-width-decorator";
import { SideBar } from "../side-bar";

// Placeholder href for all menu items in this story.
const href = "#";

const meta = preview.meta({
  title: "Navigation/SideBar/MenuList",
  component: SideBar.MenuList,
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
  decorators: [useSideBarContextDecorator],
});

export const Example = meta.story({
  args: {
    children: "No selected item",
  },
});

/**
 * If a menu item represents the current page, it should be marked as "selected". See the `SideBar.MenuItem`
 * documentation for details on how.
 */
export const SelectedItem = meta.story({
  args: {
    children: "Selected item",
  },
});

/**
 * Likewise, if a submenu item represents the current page, it should be marked as "selected". This will
 * automatically cause the parent `SideBar.MenuGroup` to be displayed as "selected" itself. See the
 * `SideBar.SubmenuItem` documentation for details on how.
 */
export const SelectedSubmenuItem = meta.story({
  args: {
    children: "Selected submenu item",
  },
});

/**
 * The menu list simply fills it parent container. If that parent does not have enough space for the labels
 * of some or all of the submenu items, those labels will truncate as per the behaviour documented for each
 * individual component. That said, authors (both designers and engineers) should typically ensure the side bar
 * is afforded enough space for the menu items it contains.
 */
export const Truncation = Example.extend({
  decorators: [useSideBarWidthDecorator],

  parameters: {
    sideBar: {
      width: "120px",
    },
  },
});

/**
 * When the side bar is collapsed, only the menu item's icons will be visible.
 */
export const Collapsed = Example.extend({
  decorators: [useSideBarWidthDecorator],

  parameters: {
    sideBar: {
      state: "collapsed",
    },
  },
});

function buildMenu(type: "No selected item" | "Selected item" | "Selected submenu item") {
  return [
    <SideBar.MenuList.Item
      key="1"
      aria-current={type === "Selected item" ? "page" : false}
      href={href}
      icon={<PropertyIcon />}
    >
      Menu item 1
    </SideBar.MenuList.Item>,
    <SideBar.MenuList.Group
      key="2"
      summary={
        <SideBar.MenuList.GroupSummary icon={<PropertyIcon />}>
          Menu item 2
        </SideBar.MenuList.GroupSummary>
      }
    >
      <SideBar.MenuList.Submenu>
        <SideBar.MenuList.SubmenuItem
          aria-current={type === "Selected submenu item" ? "page" : false}
          href={href}
        >
          Submenu item 1
        </SideBar.MenuList.SubmenuItem>
        <SideBar.MenuList.SubmenuItem aria-current={false} href={href}>
          Submenu item 2
        </SideBar.MenuList.SubmenuItem>
      </SideBar.MenuList.Submenu>
    </SideBar.MenuList.Group>,
  ];
}
