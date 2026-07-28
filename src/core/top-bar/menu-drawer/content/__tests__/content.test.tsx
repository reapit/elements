import { render, screen } from "@testing-library/react";

import { TopBarMenuDrawerContent } from "../content";

test("renders an element with children", () => {
  render(<TopBarMenuDrawerContent>Content</TopBarMenuDrawerContent>);
  expect(screen.getByText("Content")).toBeVisible();
});

test("forwards additional props to element", () => {
  render(<TopBarMenuDrawerContent data-testid="header" />);
  expect(screen.getByTestId("header")).toBeVisible();
});
