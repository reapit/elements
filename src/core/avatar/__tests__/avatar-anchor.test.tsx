import { render, screen } from "@testing-library/react";

import { AvatarAnchor } from "../avatar-anchor";

test("renders a link element", () => {
  render(
    <AvatarAnchor href="https://fake.url" aria-label="View profile">
      AB
    </AvatarAnchor>,
  );
  expect(screen.getByRole("link", { name: "View profile" })).toBeVisible();
});

test("renders the `aria-label` as a tooltip and marks itself as interactive", () => {
  render(
    <AvatarAnchor href="https://fake.url" aria-label="View profile">
      AB
    </AvatarAnchor>,
  );
  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("data-interactive", "true");
  expect(screen.getByText("View profile")).toBeInTheDocument();
});
