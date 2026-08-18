import { render, screen } from "@testing-library/react";

import { TopBarAvatarBase } from "../avatar-base";

test('renders as a button when as="button" with given children', () => {
  render(
    <TopBarAvatarBase as="button" aria-label="Test button">
      KD
    </TopBarAvatarBase>,
  );
  expect(screen.getByRole("button")).toBeVisible();
  expect(screen.getByText("KD")).toBeVisible();
});

test('renders as an anchor when as="a" with given children', () => {
  render(
    <TopBarAvatarBase as="a" href="/profile" aria-label="View profile">
      KD
    </TopBarAvatarBase>,
  );
  expect(screen.getByRole("link")).toBeVisible();
  expect(screen.getByText("KD")).toBeVisible();
});

test("requires aria-label for button", () => {
  render(
    <TopBarAvatarBase as="button" aria-label="Custom label">
      KD
    </TopBarAvatarBase>,
  );
  expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Custom label");
});

test("requires aria-label for anchor", () => {
  render(
    <TopBarAvatarBase as="a" href="/profile" aria-label="View profile">
      KD
    </TopBarAvatarBase>,
  );
  expect(screen.getByRole("link")).toHaveAttribute("aria-label", "View profile");
});

test("forwards className to the element", () => {
  render(
    <TopBarAvatarBase as="button" aria-label="Profile" className="custom-class">
      KD
    </TopBarAvatarBase>,
  );
  const button = screen.getByRole("button");
  expect(button).toHaveClass("custom-class");
});

test("forwards additional props to button element", () => {
  render(
    <TopBarAvatarBase as="button" aria-label="Profile" data-testid="test-avatar">
      KD
    </TopBarAvatarBase>,
  );
  expect(screen.getByTestId("test-avatar")).toBeVisible();
});

test("forwards additional props to anchor element", () => {
  render(
    <TopBarAvatarBase as="a" aria-label="Profile" data-testid="test-avatar" href="/profile">
      KD
    </TopBarAvatarBase>,
  );
  expect(screen.getByTestId("test-avatar")).toBeVisible();
});
