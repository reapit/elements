import { render, screen } from "@testing-library/react";

import { FormLayoutHeader } from "../header";

test("renders a header element", () => {
  render(<FormLayoutHeader>content</FormLayoutHeader>);
  expect(screen.getByRole("banner")).toBeVisible();
});

test("renders children", () => {
  render(<FormLayoutHeader>Header content</FormLayoutHeader>);
  expect(screen.getByText("Header content")).toBeVisible();
});

test("forwards additional props to the underlying element", () => {
  render(<FormLayoutHeader data-testid="header">content</FormLayoutHeader>);
  expect(screen.getByTestId("header")).toBeVisible();
});

test("merges className with the default class", () => {
  render(
    <FormLayoutHeader className="custom-class" data-testid="header">
      content
    </FormLayoutHeader>,
  );
  expect(screen.getByTestId("header")).toHaveClass("custom-class");
});
