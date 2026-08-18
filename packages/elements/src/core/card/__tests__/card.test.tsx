import { render, screen } from "@testing-library/react";

import { Card } from "../card";

test("renders a div element by default", () => {
  render(<Card data-testid="card">Content</Card>);
  expect(screen.getByTestId("card").tagName).toBe("DIV");
});

test('renders an article element when `as="article"`', () => {
  render(
    <Card as="article" data-testid="card">
      Content
    </Card>,
  );
  expect(screen.getByTestId("card").tagName).toBe("ARTICLE");
});

test('renders an aside element when `as="aside"`', () => {
  render(
    <Card as="aside" data-testid="card">
      Content
    </Card>,
  );
  expect(screen.getByTestId("card").tagName).toBe("ASIDE");
});

test('renders a section element when `as="section"`', () => {
  render(
    <Card as="section" data-testid="card">
      Content
    </Card>,
  );
  expect(screen.getByTestId("card").tagName).toBe("SECTION");
});

test("renders children", () => {
  render(<Card>Hello card</Card>);
  expect(screen.getByText("Hello card")).toBeVisible();
});

test("sets data-is-borderless attribute when `isBorderless` is true", () => {
  render(
    <Card isBorderless data-testid="card">
      Content
    </Card>,
  );
  expect(screen.getByTestId("card")).toHaveAttribute("data-is-borderless", "true");
});

test("does not set data-is-borderless attribute when `isBorderless` is false", () => {
  render(
    <Card isBorderless={false} data-testid="card">
      Content
    </Card>,
  );
  expect(screen.getByTestId("card")).not.toHaveAttribute("data-is-borderless");
});

test("applies borderRadius override as an inline style", () => {
  render(
    <Card borderRadius="--border-radius-l" data-testid="card">
      Content
    </Card>,
  );
  expect(screen.getByTestId("card").style.borderRadius).toBe("var(--border-radius-l)");
});

test("applies padding override as a CSS variable", () => {
  render(
    <Card data-testid="card" padding="--spacing-2">
      Content
    </Card>,
  );
  expect(screen.getByTestId("card").style.getPropertyValue("--card-padding")).toBe(
    "var(--spacing-2)",
  );
});

test("merges consumer style with override props", () => {
  render(
    <Card borderRadius="--border-radius-m" data-testid="card" style={{ color: "red" }}>
      Content
    </Card>,
  );
  const card = screen.getByTestId("card");
  expect(card.style.borderRadius).toBe("var(--border-radius-m)");
  expect(card).toHaveStyle({ color: "red" });
});

test("forwards additional props to the underlying element", () => {
  render(
    <Card aria-label="my card" data-testid="card">
      Content
    </Card>,
  );
  expect(screen.getByTestId("card")).toHaveAttribute("aria-label", "my card");
});

test("forwards className to the underlying element", () => {
  render(
    <Card className="custom" data-testid="card">
      Content
    </Card>,
  );
  expect(screen.getByTestId("card")).toHaveClass("custom");
});
