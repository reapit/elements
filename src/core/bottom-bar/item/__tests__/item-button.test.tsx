import { render, screen } from "@testing-library/react";

import { NotificationIcon } from "#src/icons/notification";
import { StarIcon } from "#src/icons/star";

import { BottomBarItemButton } from "../item-button";

test("renders as a button with an accessible name", () => {
  render(
    <BottomBarItemButton icon={<StarIcon />} onClick={() => void 0} aria-label="My Item">
      Label
    </BottomBarItemButton>,
  );
  expect(screen.getByRole("button", { name: "My Item" })).toBeVisible();
});

test("forwards additional props to the button element", () => {
  const testId = "nav-icon-item";
  render(
    <BottomBarItemButton icon={<StarIcon />} onClick={() => void 0} data-testid={testId}>
      Label
    </BottomBarItemButton>,
  );

  const item = screen.getByTestId(testId);
  expect(item).toBeVisible();
});

test("can display a badge", () => {
  render(
    <BottomBarItemButton icon={<NotificationIcon />} onClick={() => void 0} hasBadge>
      Notifications
    </BottomBarItemButton>,
  );
  const button = screen.getByRole("button", { name: "Notifications" });
  expect(button.querySelector("span")).toBeVisible();
});
