import { render, screen } from "@testing-library/react";

import { Divider } from "../divider";

test("renders a separator element", () => {
  render(<Divider />);
  expect(screen.getByRole("separator")).toBeVisible();
});

test("has horizontal orientation by default", () => {
  render(<Divider />);
  expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "horizontal");
});

test("uses solid variant by default", () => {
  render(<Divider />);
  expect(screen.getByRole("separator")).toHaveAttribute("data-variant", "solid");
});

test("can have vertical orientation", () => {
  render(<Divider aria-orientation="vertical" />);
  expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
});

test("can use dashed variant", () => {
  render(<Divider data-variant="dashed" />);
  expect(screen.getByRole("separator")).toHaveAttribute("data-variant", "dashed");
});

test("forwards additional props to the separator element", () => {
  render(<Divider data-testid="my-divider" />);
  expect(screen.getByTestId("my-divider")).toBeVisible();
});
