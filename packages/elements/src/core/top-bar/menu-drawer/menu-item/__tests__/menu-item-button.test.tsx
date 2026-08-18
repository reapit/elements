import { fireEvent, render, screen } from "@testing-library/react";

import { TopBarMenuDrawerMenuItemButton } from "../menu-item-button";
import { elTopBarMenuDrawerMenuItem } from "../styles";

test("renders a button", () => {
  render(<TopBarMenuDrawerMenuItemButton>Action</TopBarMenuDrawerMenuItemButton>);
  expect(screen.getByRole("button", { name: "Action" })).toBeVisible();
});

test(`combines the .${elTopBarMenuDrawerMenuItem} and consumer-supplied classes correctly`, () => {
  render(
    <TopBarMenuDrawerMenuItemButton className="my-custom-class">
      Sign Out
    </TopBarMenuDrawerMenuItemButton>,
  );
  expect(screen.getByRole("button")).toHaveAttribute(
    "class",
    `${elTopBarMenuDrawerMenuItem} my-custom-class`,
  );
});

test("triggers onClick handler when clicked", () => {
  const handleClick = vi.fn();

  render(
    <TopBarMenuDrawerMenuItemButton onClick={handleClick}>Sign Out</TopBarMenuDrawerMenuItemButton>,
  );

  fireEvent.click(screen.getByRole("button"));

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('has type="button" by default', () => {
  render(<TopBarMenuDrawerMenuItemButton>Sign Out</TopBarMenuDrawerMenuItemButton>);
  expect(screen.getByRole("button")).toHaveAttribute("type", "button");
});

test("does not render badge when hasBadge is false", () => {
  render(<TopBarMenuDrawerMenuItemButton>Sign Out</TopBarMenuDrawerMenuItemButton>);
  const button = screen.getByRole("button");
  const spans = button.querySelectorAll("span");
  // Should only have the label span, not the badge span
  expect(spans.length).toBe(1);
});

test("renders badge when hasBadge is true", () => {
  render(<TopBarMenuDrawerMenuItemButton hasBadge>Sign Out</TopBarMenuDrawerMenuItemButton>);
  const button = screen.getByRole("button");
  const spans = button.querySelectorAll("span");
  // Should have both label and badge spans
  expect(spans.length).toBe(2);
});
