import { render, screen } from "@testing-library/react";

import { TopBarAvatarAnchor } from "../avatar-anchor";

const mockHref = "https://fake.url";

test("renders an anchor element with given children", () => {
  render(<TopBarAvatarAnchor href={mockHref}>KD</TopBarAvatarAnchor>);
  expect(screen.getByRole("link")).toBeVisible();
  expect(screen.getByText("KD")).toBeVisible();
});

test("has correct href attribute", () => {
  render(<TopBarAvatarAnchor href="/profile">KD</TopBarAvatarAnchor>);
  expect(screen.getByRole("link")).toHaveAttribute("href", "/profile");
});

test("has correct default aria-label", () => {
  render(<TopBarAvatarAnchor href={mockHref}>KD</TopBarAvatarAnchor>);
  expect(screen.getByRole("link")).toHaveAttribute("aria-label", "View profile");
});

test("allows custom aria-label", () => {
  const customLabel = "Custom menu label";
  render(
    <TopBarAvatarAnchor aria-label={customLabel} href={mockHref}>
      KD
    </TopBarAvatarAnchor>,
  );
  expect(screen.getByRole("link")).toHaveAttribute("aria-label", customLabel);
});

test("forwards additional props to the anchor element", () => {
  const testId = "avatar-anchor";
  render(
    <TopBarAvatarAnchor data-testid={testId} href={mockHref}>
      KD
    </TopBarAvatarAnchor>,
  );

  const anchor = screen.getByTestId(testId);
  expect(anchor).toBeVisible();
});
