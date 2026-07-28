import { fireEvent, render, screen } from "@testing-library/react";

import { ContactIcon } from "#src/icons/contact";
import { DashboardIcon } from "#src/icons/dashboard";
import { PropertyIcon } from "#src/icons/property";
import { SettingsIcon } from "#src/icons/settings";

import { SideBar } from "../side-bar";

const href = "#";

const children = (
  <SideBar.MenuList>
    <SideBar.MenuItem aria-current={false} href={href} icon={<DashboardIcon />}>
      Menu item 1
    </SideBar.MenuItem>
    <SideBar.MenuItem aria-current={false} href={href} icon={<ContactIcon />}>
      Menu item 2
    </SideBar.MenuItem>
    <SideBar.MenuGroup
      summary={
        <SideBar.MenuGroupSummary icon={<PropertyIcon />}>Menu item 3</SideBar.MenuGroupSummary>
      }
    >
      <SideBar.Submenu>
        <SideBar.SubmenuItem aria-current={false} href={href}>
          Submenu item 1
        </SideBar.SubmenuItem>
        <SideBar.SubmenuItem aria-current={false} href={href}>
          Submenu item 2
        </SideBar.SubmenuItem>
      </SideBar.Submenu>
    </SideBar.MenuGroup>
    <SideBar.MenuGroup
      summary={
        <SideBar.MenuGroupSummary icon={<SettingsIcon />}>Menu item 4</SideBar.MenuGroupSummary>
      }
    >
      <SideBar.Submenu>
        <SideBar.SubmenuItem aria-current={false} href={href}>
          Submenu item 3
        </SideBar.SubmenuItem>
        <SideBar.SubmenuItem aria-current={false} href={href}>
          Submenu item 4
        </SideBar.SubmenuItem>
      </SideBar.Submenu>
    </SideBar.MenuGroup>
  </SideBar.MenuList>
);

const footer = <SideBar.CollapseButton />;

test('renders a navigation element with an accessible name of "Sidebar navigation"', () => {
  render(<SideBar footer={footer}>{children}</SideBar>);
  expect(screen.getByRole("navigation", { name: "Sidebar navigation" })).toBeVisible();
});

test("allows the accessible name to be supplied by the consumer", () => {
  render(
    <SideBar aria-label="My accessible name" footer={footer}>
      {children}
    </SideBar>,
  );
  expect(screen.getByRole("navigation", { name: "My accessible name" })).toBeVisible();
});

test('has a `data-state="expanded" attribute when expanded', () => {
  // NOTE: the SideBar, under test, will be expanded because the viewport is wider than our
  // "wide screen" breakpoint. Thus, we need to collapse it manually.
  render(<SideBar footer={footer}>{children}</SideBar>);
  fireEvent.click(screen.getByRole("button", { name: "Expand" }));
  expect(screen.getByRole("navigation")).toHaveAttribute("data-state", "expanded");
});

test('has a `data-state="collapsed" attribute when collapsed', () => {
  // NOTE: the SideBar, under test, will be expanded because the viewport is wider than our
  // "wide screen" breakpoint.
  render(<SideBar footer={footer}>{children}</SideBar>);
  expect(screen.getByRole("navigation")).toHaveAttribute("data-state", "collapsed");
});
