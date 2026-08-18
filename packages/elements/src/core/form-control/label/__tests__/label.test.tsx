import { render, screen } from "@testing-library/react";

import { FormControlLabel } from "../label";

test('can label a form control when `as="label"`', () => {
  render(
    <>
      <FormControlLabel as="label" htmlFor="my-input">
        Label
      </FormControlLabel>
      <input id="my-input" />
    </>,
  );
  expect(screen.getByRole("textbox", { name: "Label" })).toBeVisible();
});

test('can label a fieldset when `as="legend"`', () => {
  render(
    <fieldset>
      <FormControlLabel as="legend">Label</FormControlLabel>
    </fieldset>,
  );
  expect(screen.getByRole("group", { name: "Label" })).toBeVisible();
});

test("has correct class name", () => {
  const { container } = render(
    <FormControlLabel as="label" className="my-custom-class" htmlFor="my-input">
      Child
    </FormControlLabel>,
  );
  expect(container.firstElementChild).toHaveClass("el-form-control-label my-custom-class");
});

test("displays required indicator when isRequired is true", () => {
  render(
    <>
      <FormControlLabel as="label" htmlFor="my-input" isRequired>
        Label
      </FormControlLabel>
      <input id="my-input" />
    </>,
  );
  expect(screen.getByRole("textbox", { name: "Label (Required)" })).toBeVisible();
});

test("applies correct data-size attribute to child span element", () => {
  render(
    <>
      <FormControlLabel as="label" htmlFor="my-input" size="large">
        Label
      </FormControlLabel>
      <input id="my-input" />
    </>,
  );
  // NOTE: size is mapped to data-size using mapSizeToLabelSize
  expect(screen.getByText("Label")).toHaveAttribute("data-size", "sm");
});

test("forwards additional attributes to the label/legend element", () => {
  const { container } = render(
    <FormControlLabel as="label" data-testid="test-id" htmlFor="my-input">
      Label
    </FormControlLabel>,
  );
  expect(screen.getByTestId("test-id")).toBe(container.firstElementChild);
});
