import { render, screen } from "@testing-library/react";

import { TopBarMenuDrawerSubmenuListItemButton } from "../submenu-list-item-button";

test("wraps children in a list item", () => {
  render(
    <ul>
      <TopBarMenuDrawerSubmenuListItemButton>Test</TopBarMenuDrawerSubmenuListItemButton>
    </ul>,
  );

  const button = screen.getByRole("button");
  expect(button.parentElement?.tagName).toBe("LI");
});
