import { fireEvent, render, screen } from "@testing-library/react";

import { TopBarAvatarButton } from "../avatar-button";

test("renders a button element with given children", () => {
  render(<TopBarAvatarButton>KD</TopBarAvatarButton>);
  expect(screen.getByRole("button")).toBeVisible();
  expect(screen.getByText("KD")).toBeVisible();
});

test("calls onClick handler when clicked", () => {
  const onClick = vi.fn();
  render(<TopBarAvatarButton onClick={onClick}>KD</TopBarAvatarButton>);

  const button = screen.getByRole("button");
  fireEvent.click(button);

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("has correct default aria-label", () => {
  render(<TopBarAvatarButton>KD</TopBarAvatarButton>);
  expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Profile menu");
});

test("allows custom aria-label", () => {
  const customLabel = "Custom menu label";
  render(<TopBarAvatarButton aria-label={customLabel}>KD</TopBarAvatarButton>);
  expect(screen.getByRole("button")).toHaveAttribute("aria-label", customLabel);
});

test("forwards additional props to the button element", () => {
  const testId = "avatar-button";
  render(<TopBarAvatarButton data-testid={testId}>KD</TopBarAvatarButton>);

  const button = screen.getByTestId(testId);
  expect(button).toBeVisible();
});
