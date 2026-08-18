import { render, screen } from "@testing-library/react";

import { TopBarMenuDrawerMainNav } from "../main-nav";

test("renders with default aria-label", () => {
  render(
    <TopBarMenuDrawerMainNav>
      <li>Item 1</li>
    </TopBarMenuDrawerMainNav>,
  );

  expect(screen.getByRole("list", { name: "Main navigation" })).toBeVisible();
});

test("renders with custom aria-label", () => {
  render(
    <TopBarMenuDrawerMainNav aria-label="Custom main nav">
      <li>Item 1</li>
    </TopBarMenuDrawerMainNav>,
  );

  expect(screen.getByRole("list", { name: "Custom main nav" })).toBeVisible();
});

test("renders children", () => {
  render(
    <TopBarMenuDrawerMainNav>
      <li>Item 1</li>
      <li>Item 2</li>
    </TopBarMenuDrawerMainNav>,
  );

  expect(screen.getByText("Item 1")).toBeVisible();
  expect(screen.getByText("Item 2")).toBeVisible();
});

test("applies custom className", () => {
  render(
    <TopBarMenuDrawerMainNav className="custom-class" data-testid="main-nav">
      <li>Item 1</li>
    </TopBarMenuDrawerMainNav>,
  );

  expect(screen.getByTestId("main-nav")).toHaveClass("custom-class");
});

test("forwards additional props", () => {
  render(
    <TopBarMenuDrawerMainNav data-testid="main-nav" data-custom="value">
      <li>Item 1</li>
    </TopBarMenuDrawerMainNav>,
  );

  const element = screen.getByTestId("main-nav");
  expect(element).toBeVisible();
  expect(element).toHaveAttribute("data-custom", "value");
});

test("has correct displayName", () => {
  expect(TopBarMenuDrawerMainNav.displayName).toBe("TopBar.MenuMainNav");
});
