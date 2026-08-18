import { render, screen } from "@testing-library/react";

import { EmptyState } from "../empty-state";

test("renders as a div", () => {
  const { container } = render(<EmptyState>Fake child</EmptyState>);
  expect(container.firstElementChild?.tagName).toBe("DIV");
});

test("displays children", () => {
  render(<EmptyState>Fake child</EmptyState>);
  expect(screen.getByText("Fake child")).toBeVisible();
});

test("sets height via style prop when provided", () => {
  render(<EmptyState height="--size-80">Fake child</EmptyState>);
  expect(screen.getByText("Fake child")).toHaveAttribute("style", "height: var(--size-80);");
});

test("preserves other inline styles when height is provided", () => {
  render(
    <EmptyState height="--size-40" style={{ color: "red" }}>
      Fake child
    </EmptyState>,
  );
  expect(screen.getByText("Fake child")).toHaveAttribute(
    "style",
    "color: red; height: var(--size-40);",
  );
});

test("allows setting height via the style prop when the deprecated height prop is not used", () => {
  render(<EmptyState style={{ height: "10px" }}>Fake child</EmptyState>);
  expect(screen.getByText("Fake child")).toHaveAttribute("style", "height: 10px;");
});

test("forwards additional props to div", () => {
  const { container } = render(<EmptyState data-testid="test-id">Fake child</EmptyState>);
  expect(screen.getByTestId("test-id")).toBe(container.firstElementChild);
});

test("defaults to a neutral-lightest background", () => {
  render(<EmptyState>Fake child</EmptyState>);
  expect(screen.getByText("Fake child")).toHaveAttribute("data-background", "neutral-lightest");
});

test("sets data-background to the provided background", () => {
  render(<EmptyState background="transparent">Fake child</EmptyState>);
  expect(screen.getByText("Fake child")).toHaveAttribute("data-background", "transparent");
});

test("defaults to a small size", () => {
  render(<EmptyState>Fake child</EmptyState>);
  expect(screen.getByText("Fake child")).toHaveAttribute("data-size", "small");
});

test("sets data-size to the provided size", () => {
  render(<EmptyState size="large">Fake child</EmptyState>);
  expect(screen.getByText("Fake child")).toHaveAttribute("data-size", "large");
});
