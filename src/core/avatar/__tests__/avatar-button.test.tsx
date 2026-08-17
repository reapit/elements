import { render, screen } from "@testing-library/react";

import { AvatarButton } from "../avatar-button";

test("renders a button element", () => {
  render(<AvatarButton aria-label="Profile menu">AB</AvatarButton>);
  expect(screen.getByRole("button", { name: "Profile menu" })).toBeVisible();
});

test("renders the `aria-label` as a tooltip and marks itself as interactive", () => {
  render(<AvatarButton aria-label="Profile menu">AB</AvatarButton>);
  const button = screen.getByRole("button");
  expect(button).toHaveAttribute("data-interactive", "true");
  expect(screen.getByText("Profile menu")).toBeInTheDocument();
});
