import { render, screen } from "@testing-library/react";

import { EmptyStateDescription } from "../description";

test("displays the main text in a heading level 3 element", () => {
  render(<EmptyStateDescription>No things found</EmptyStateDescription>);
  expect(screen.getByRole("heading", { name: "No things found", level: 3 })).toBeVisible();
});

test("displays the secondary text in a paragraph element", () => {
  render(
    <EmptyStateDescription secondaryText="Secondary text">No things found</EmptyStateDescription>,
  );
  expect(screen.getByRole("paragraph")).toBeVisible();
  expect(screen.getByRole("paragraph")).toHaveTextContent("Secondary text");
});

test("omits the heading element when no title is provided", () => {
  render(<EmptyStateDescription secondaryText="Secondary text" />);
  expect(screen.queryByRole("heading", { level: 3 })).not.toBeInTheDocument();
});

test("forwards additional props to the root element", () => {
  const { container } = render(
    <EmptyStateDescription data-testid="test-id">No things found</EmptyStateDescription>,
  );
  expect(screen.getByTestId("test-id")).toBe(container.firstElementChild);
});
