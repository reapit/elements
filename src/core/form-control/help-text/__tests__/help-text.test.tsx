import { render, screen } from "@testing-library/react";

import { FormControlHelpText } from "../help-text";

test("renders as a paragraph", () => {
  render(<FormControlHelpText id="my-help-text">Help text</FormControlHelpText>);
  expect(screen.getByRole("paragraph")).toBeVisible();
  expect(screen.getByRole("paragraph")).toHaveTextContent("Help text");
});

test("has no data-size attribute by default", () => {
  render(<FormControlHelpText id="my-help-text">Help text</FormControlHelpText>);
  expect(screen.getByRole("paragraph")).not.toHaveAttribute("data-size");
});

test("applies the correct data-size attribute when size is specified", () => {
  render(
    <FormControlHelpText id="my-help-text" size="medium">
      Help text
    </FormControlHelpText>,
  );
  expect(screen.getByRole("paragraph")).toHaveAttribute("data-size", "medium");
});

test("forwards additional attributes to the paragraph element", () => {
  render(
    <FormControlHelpText data-testid="test-id" id="my-error-message">
      Error message
    </FormControlHelpText>,
  );
  expect(screen.getByTestId("test-id")).toBe(screen.getByRole("paragraph"));
});
