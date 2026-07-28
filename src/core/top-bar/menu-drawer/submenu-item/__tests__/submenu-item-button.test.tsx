import { fireEvent, render, screen } from "@testing-library/react";

import { TopBarMenuDrawerSubmenuItemButton } from "../submenu-item-button";

test("renders a button", () => {
  render(
    <TopBarMenuDrawerSubmenuItemButton hasBadge={false}>Logout</TopBarMenuDrawerSubmenuItemButton>,
  );
  expect(screen.getByRole("button", { name: "Logout" })).toBeVisible();
});

test("triggers onClick handler when clicked", () => {
  const handleClick = vi.fn();

  render(
    <TopBarMenuDrawerSubmenuItemButton hasBadge={false} onClick={handleClick}>
      Logout
    </TopBarMenuDrawerSubmenuItemButton>,
  );

  fireEvent.click(screen.getByRole("button"));

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('has type="button" by default', () => {
  render(
    <TopBarMenuDrawerSubmenuItemButton hasBadge={false}>Logout</TopBarMenuDrawerSubmenuItemButton>,
  );
  expect(screen.getByRole("button")).toHaveAttribute("type", "button");
});

test("does not render badge when hasBadge is false", () => {
  render(
    <TopBarMenuDrawerSubmenuItemButton hasBadge={false}>Logout</TopBarMenuDrawerSubmenuItemButton>,
  );
  const button = screen.getByRole("button");
  const spans = button.querySelectorAll("span");
  // Should only have the label span, not the badge span
  expect(spans.length).toBe(1);
});

test("renders badge when hasBadge is true", () => {
  render(<TopBarMenuDrawerSubmenuItemButton hasBadge>Logout</TopBarMenuDrawerSubmenuItemButton>);
  const button = screen.getByRole("button");
  const spans = button.querySelectorAll("span");
  // Should have both label and badge spans
  expect(spans.length).toBe(2);
});
