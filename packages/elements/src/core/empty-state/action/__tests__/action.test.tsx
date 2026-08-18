import { render, screen } from "@testing-library/react";

import { EmptyStateAction } from "../action";

test("renders as a link element", () => {
  render(<EmptyStateAction href="https://fake.url">Action</EmptyStateAction>);
  expect(screen.getByRole("link", { name: "Action" })).toBeVisible();
});

test("is a medium sized button", () => {
  render(<EmptyStateAction href="https://fake.url">Action</EmptyStateAction>);
  expect(screen.getByRole("link")).toHaveAttribute("data-size", "medium");
});

test("is a tertiary button", () => {
  render(<EmptyStateAction href="https://fake.url">Action</EmptyStateAction>);
  expect(screen.getByRole("link")).toHaveAttribute("data-variant", "tertiary");
});

test("uses the tertiary button's link styling", () => {
  render(<EmptyStateAction href="https://fake.url">Action</EmptyStateAction>);
  expect(screen.getByRole("link")).toHaveAttribute("data-use-link-style", "true");
});

test("forwards additional props to the link", () => {
  render(
    <EmptyStateAction data-testid="test-id" href="https://fake.url">
      Action
    </EmptyStateAction>,
  );
  expect(screen.getByTestId("test-id")).toBe(screen.getByRole("link"));
});
