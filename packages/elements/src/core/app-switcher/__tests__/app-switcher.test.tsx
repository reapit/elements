import { fireEvent, render, screen } from "@testing-library/react";

import { AppSwitcher } from "../app-switcher";

const exampleChildren = [
  <AppSwitcher.YourAppsMenuGroup key="1">
    <AppSwitcher.ProductMenuItem href="#" productId="ireWeb" />
  </AppSwitcher.YourAppsMenuGroup>,
  <AppSwitcher.Divider key="2" />,
  <AppSwitcher.ExploreMenuGroup key="3">
    <AppSwitcher.ProductMenuItem href="#" productId="consoleCloud" />
    <AppSwitcher.ProductMenuItem href="#" productId="keyWhere" />
  </AppSwitcher.ExploreMenuGroup>,
];

test("app switcher button will open the menu when clicked", () => {
  render(<AppSwitcher>{exampleChildren}</AppSwitcher>);

  const trigger = screen.getByRole("button", { name: "App Switcher" });
  const menu = screen.getByRole("menu");
  expect(trigger).toHaveAttribute("popovertarget", menu.id);
});

test("menu is labelled by the trigger button", () => {
  render(<AppSwitcher>{exampleChildren}</AppSwitcher>);
  expect(screen.getByRole("menu", { name: "App Switcher" })).toBeVisible();
});

test("menu trigger button is visible", () => {
  render(<AppSwitcher>{exampleChildren}</AppSwitcher>);
  expect(screen.getByRole("button", { name: "App Switcher" })).toBeVisible();
});

test("the menu is visible when the trigger button is clicked", () => {
  render(<AppSwitcher>{exampleChildren}</AppSwitcher>);
  const button = screen.getByRole("button");
  fireEvent.click(button);
  expect(screen.getByRole("menu")).toBeVisible();
});

test("additional props are forwarded to the trigger button", () => {
  render(<AppSwitcher data-testid="test-id">{exampleChildren}</AppSwitcher>);
  expect(screen.getByTestId("test-id")).toBe(screen.getByRole("button"));
});
