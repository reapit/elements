import { render, screen } from "@testing-library/react";

import { AnchorButton } from "../anchor-button";

test("renders a link element", () => {
  render(
    <AnchorButton href="https://www.google.com" size="medium" variant="primary">
      Button
    </AnchorButton>,
  );
  expect(screen.getByRole("link")).toBeVisible();
});
