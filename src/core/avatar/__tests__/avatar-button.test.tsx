import { render, screen } from "@testing-library/react";

import { AvatarButton } from "../avatar-button";

test("renders a button element", () => {
  render(<AvatarButton aria-label="Profile menu">AB</AvatarButton>);
  expect(screen.getByRole("button", { name: "Profile menu" })).toBeVisible();
});
