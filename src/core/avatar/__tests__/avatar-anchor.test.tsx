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
