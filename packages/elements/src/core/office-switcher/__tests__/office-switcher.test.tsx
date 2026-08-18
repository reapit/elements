import { render, screen } from "@testing-library/react";

import { OfficeSwitcher } from "../office-switcher";

test("renders children", () => {
  render(<OfficeSwitcher>London Office</OfficeSwitcher>);
  expect(screen.getByText("London Office")).toBeVisible();
});

test("forwards additional props to underlying element", () => {
  render(<OfficeSwitcher data-testid="my-office-switcher">London Office</OfficeSwitcher>);
  expect(screen.getByTestId("my-office-switcher")).toBeVisible();
});
