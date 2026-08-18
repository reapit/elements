import { render, screen } from "@testing-library/react";

import { Menu } from "#src/core/menu";
import { StarIcon } from "#src/icons/star";

import { BottomBar } from "../bottom-bar";

const href = "#";

const children = (
  <BottomBar.MenuList>
    <BottomBar.Item aria-current={false} icon={<StarIcon />} href={href}>
      Menu 1
    </BottomBar.Item>
    <BottomBar.Item aria-current={false} icon={<StarIcon />} href={href} hasBadge>
      Menu 2
    </BottomBar.Item>
    <BottomBar.Item aria-current={false} icon={<StarIcon />} href={href}>
      Menu 3
    </BottomBar.Item>
    <BottomBar.Item aria-current={false} icon={<StarIcon />} href={href}>
      Menu 4
    </BottomBar.Item>
    <BottomBar.MenuItem>
      <Menu.Item>Menu item 5</Menu.Item>
      <Menu.Item>Menu item 6</Menu.Item>
      <Menu.Item>Menu item 6</Menu.Item>
    </BottomBar.MenuItem>
  </BottomBar.MenuList>
);

test("renders a navigation element", () => {
  render(<BottomBar aria-label="Bottom navigation">{children}</BottomBar>);

  const nav = screen.getByRole("navigation");
  expect(nav).toBeVisible();
});

test('has a default aria-label of "Bottom navigation"', () => {
  render(<BottomBar aria-label="Bottom navigation">{children}</BottomBar>);

  const nav = screen.getByRole("navigation");
  expect(nav).toHaveAttribute("aria-label", "Bottom navigation");
});

test("allows overriding the aria-label", () => {
  render(<BottomBar aria-label="Custom label">{children}</BottomBar>);

  const nav = screen.getByRole("navigation");
  expect(nav).toHaveAttribute("aria-label", "Custom label");
});

test("forwards additional props to the nav element", () => {
  render(
    <BottomBar aria-label="Bottom navigation" data-testid="test" className="custom-class">
      {children}
    </BottomBar>,
  );

  const nav = screen.getByTestId("test");
  expect(nav).toHaveClass("custom-class");
});
