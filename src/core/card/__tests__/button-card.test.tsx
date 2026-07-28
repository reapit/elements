import { fireEvent, render, screen } from "@testing-library/react";

import { ButtonCard } from "../button-card";

test("renders a button element", () => {
  render(<ButtonCard>Content</ButtonCard>);
  expect(screen.getByRole("button")).toBeVisible();
});

test('defaults to type="button"', () => {
  render(<ButtonCard>Content</ButtonCard>);
  expect(screen.getByRole("button")).toHaveAttribute("type", "button");
});

test("renders children", () => {
  render(<ButtonCard>Hello card</ButtonCard>);
  expect(screen.getByText("Hello card")).toBeVisible();
});

test("calls onClick when clicked", () => {
  const onClick = vi.fn();
  render(<ButtonCard onClick={onClick}>Content</ButtonCard>);
  fireEvent.click(screen.getByRole("button"));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test("forwards aria-pressed to the button element", () => {
  render(<ButtonCard aria-pressed="true">Content</ButtonCard>);
  expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
});

test("does not set aria-pressed when not provided", () => {
  render(<ButtonCard>Content</ButtonCard>);
  expect(screen.getByRole("button")).not.toHaveAttribute("aria-pressed");
});

test("forwards disabled to the button element", () => {
  render(<ButtonCard disabled>Content</ButtonCard>);
  expect(screen.getByRole("button")).toBeDisabled();
});

test("applies borderRadius override as an inline style", () => {
  render(
    <ButtonCard borderRadius="--border-radius-l" data-testid="card">
      Content
    </ButtonCard>,
  );
  expect(screen.getByTestId("card").style.borderRadius).toBe("var(--border-radius-l)");
});

test("applies padding override as a CSS variable", () => {
  render(
    <ButtonCard data-testid="card" padding="--spacing-2">
      Content
    </ButtonCard>,
  );
  expect(screen.getByTestId("card").style.getPropertyValue("--card-padding")).toBe(
    "var(--spacing-2)",
  );
});

test("forwards additional props to the underlying element", () => {
  render(<ButtonCard data-testid="my-card">Content</ButtonCard>);
  expect(screen.getByTestId("my-card")).toBeVisible();
});

test("forwards className to the underlying element", () => {
  render(
    <ButtonCard className="custom" data-testid="card">
      Content
    </ButtonCard>,
  );
  expect(screen.getByTestId("card")).toHaveClass("custom");
});
