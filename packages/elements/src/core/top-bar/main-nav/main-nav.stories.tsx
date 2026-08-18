import preview from "#.storybook/preview";
import { Menu } from "#src/core/menu";

import { TopBar } from "../top-bar";

const href = "#";

const meta = preview.meta({
  title: "Navigation/TopBar/MainNav",
  component: TopBar.MainNav,
  argTypes: {
    children: {
      control: "radio",
      options: ["No selected item", "Selected item", "With menu"],
      mapping: {
        "No selected item": buildNav("No selected item"),
        "Selected item": buildNav("Selected item"),
        "With menu": buildNav("With menu"),
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
 * If a nav item represents the current page, it should be marked as "selected". See the `TopBar.NavItem`
 * documentation for details on how.
 */
export const SelectedItem = meta.story({
  args: {
    children: "Selected item",
  },
});

/**
 * The main nav can contain a mix of nav items and menu items.
 */
export const WithMenu = meta.story({
  args: {
    children: "With menu",
  },
});

function buildNav(type: "No selected item" | "Selected item" | "With menu") {
  return [
    <TopBar.MainNav.Item
      key="1"
      href={href}
      aria-current={type === "Selected item" ? "page" : false}
    >
      Nav item 1
    </TopBar.MainNav.Item>,
    <TopBar.MainNav.Item key="2" aria-current={false} href={href}>
      Nav item 2
    </TopBar.MainNav.Item>,
    type === "With menu" && (
      <TopBar.MainNav.MenuItem key="with-menu-item" label="More">
        <Menu.Item>Menu Item 1</Menu.Item>
        <Menu.Item>Menu Item 2</Menu.Item>
        <Menu.Item>Menu Item 3</Menu.Item>
      </TopBar.MainNav.MenuItem>
    ),
  ].filter(Boolean);
}
