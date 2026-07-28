import { render, screen } from "@testing-library/react";

import { AnchorMenuItem } from "../anchor-item";

test("renders a menuitem element", () => {
  render(<AnchorMenuItem href="https://www.google.com">Menu item</AnchorMenuItem>);
  expect(screen.getByRole("menuitem")).toBeVisible();
});
