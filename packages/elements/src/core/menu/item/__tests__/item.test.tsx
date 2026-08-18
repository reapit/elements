import { render, screen } from "@testing-library/react";

import { MenuItem } from "../item";

test("renders a menuitem element", () => {
  render(<MenuItem>Menu item</MenuItem>);
  expect(screen.getByRole("menuitem")).toBeVisible();
});
