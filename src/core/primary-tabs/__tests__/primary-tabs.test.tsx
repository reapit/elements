import { render, screen } from "@testing-library/react";

import { PrimaryTabs } from "../primary-tabs";

const children = [
  <PrimaryTabs.Item key="apples" href="#" aria-current={false}>
    Apples
  </PrimaryTabs.Item>,
  <PrimaryTabs.Item key="bananas" aria-current={false} href="#">
    Bananas
  </PrimaryTabs.Item>,
  <PrimaryTabs.Item key="peaches" aria-current={false} href="#">
    Peaches
  </PrimaryTabs.Item>,
  <PrimaryTabs.Item key="strawberries" aria-current={false} href="#">
    Strawberries
  </PrimaryTabs.Item>,
  <PrimaryTabs.Item key="watermelon" aria-current={false} href="#">
    Watermelon
  </PrimaryTabs.Item>,
];

test("renders as a navigation element with a list", () => {
  render(<PrimaryTabs>{children}</PrimaryTabs>);
  expect(screen.getByRole("navigation")).toBeVisible();
  expect(screen.getByRole("list")).toBeVisible();
});

test('has a default data-overflow of "visible"', () => {
  render(<PrimaryTabs>{children}</PrimaryTabs>);
  expect(screen.getByRole("navigation")).toHaveAttribute("data-overflow", "visible");
});

test("allows overriding the data-overflow", () => {
  render(<PrimaryTabs overflow="scroll">{children}</PrimaryTabs>);
  expect(screen.getByRole("navigation")).toHaveAttribute("data-overflow", "scroll");
});

test("forwards additional props to the nav element", () => {
  render(<PrimaryTabs data-testid="test">{children}</PrimaryTabs>);
  expect(screen.getByTestId("test")).toBeVisible();
});
