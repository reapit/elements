import { render, screen } from "@testing-library/react";

import { TopBarMainNav } from "../main-nav";

const children = [
  <TopBarMainNav.Item key="1" href="#" aria-current={false}>
    Nav item 1
  </TopBarMainNav.Item>,
  <TopBarMainNav.Item key="2" aria-current={false} href="#">
    Nav item 2
  </TopBarMainNav.Item>,
];

test("renders as a navigation element with a list", () => {
  render(<TopBarMainNav>{children}</TopBarMainNav>);

  const nav = screen.getByRole("navigation");
  expect(nav).toBeVisible();

  const list = screen.getByRole("list");
  expect(list).toBeVisible();
});

test('has a default aria-label of "Main navigation"', () => {
  render(<TopBarMainNav>{children}</TopBarMainNav>);

  const nav = screen.getByRole("navigation");
  expect(nav).toHaveAttribute("aria-label", "Main navigation");
});

test("allows overriding the aria-label", () => {
  render(<TopBarMainNav aria-label="Custom label">{children}</TopBarMainNav>);

  const nav = screen.getByRole("navigation");
  expect(nav).toHaveAttribute("aria-label", "Custom label");
});

test("forwards additional props to the nav element", () => {
  render(
    <TopBarMainNav data-testid="test" className="custom-class">
      {children}
    </TopBarMainNav>,
  );

  const nav = screen.getByTestId("test");
  expect(nav).toHaveClass("custom-class");
});
