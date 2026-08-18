import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { TopBarMenuDrawerSubmenu } from "../submenu";

test("renders a list", () => {
  render(
    <TopBarMenuDrawerSubmenu>
      <TopBarMenuDrawerSubmenu.Item href="#" aria-current={false}>
        Item 1
      </TopBarMenuDrawerSubmenu.Item>
      <TopBarMenuDrawerSubmenu.Item href="#" aria-current="page">
        Item 2
      </TopBarMenuDrawerSubmenu.Item>
      <TopBarMenuDrawerSubmenu.ItemButton onClick={vi.fn()}>
        Item 3
      </TopBarMenuDrawerSubmenu.ItemButton>
    </TopBarMenuDrawerSubmenu>,
  );
  expect(screen.getByRole("list")).toBeVisible();
});

test("renders list items as children", () => {
  render(
    <TopBarMenuDrawerSubmenu>
      <TopBarMenuDrawerSubmenu.Item href="#" aria-current={false}>
        Item 1
      </TopBarMenuDrawerSubmenu.Item>
      <TopBarMenuDrawerSubmenu.Item href="#" aria-current="page">
        Item 2
      </TopBarMenuDrawerSubmenu.Item>
      <TopBarMenuDrawerSubmenu.ItemButton onClick={vi.fn()}>
        Item 3
      </TopBarMenuDrawerSubmenu.ItemButton>
    </TopBarMenuDrawerSubmenu>,
  );
  const list = screen.getByRole("list");
  expect(list.children).toHaveLength(3);
});
