import { render, screen } from "@testing-library/react";

import { CheckboxControl } from "../checkbox-control";

test("renders a checkbox", () => {
  render(<CheckboxControl label="Label" />);
  expect(screen.getByRole("checkbox")).toBeInTheDocument();
});

test("displays error text, when provided", () => {
  render(
    <CheckboxControl label="Label" supplementaryInfo="Additional info" errorText="Error text" />,
  );
  expect(screen.getByText("Error text")).toBeVisible();
});

test("is described by the error text via aria-errormessage, when provided", () => {
  render(
    <CheckboxControl label="Label" supplementaryInfo="Additional info" errorText="Error text" />,
  );
  expect(screen.getByRole("checkbox")).toHaveAccessibleErrorMessage("Error text");
});

test("forwards additional attributes to the checkbox", () => {
  render(<CheckboxControl data-testid="test-id" label="Label" value="test-value" />);
  expect(screen.getByTestId("test-id")).toBe(screen.getByRole("checkbox"));
});

test("sets aria-invalid to true when error text is present", () => {
  render(<CheckboxControl label="Label" errorText="Error text" />);
  expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
});

test("does not set aria-invalid when error text is not present", () => {
  render(<CheckboxControl label="Label" />);
  expect(screen.getByRole("checkbox")).not.toHaveAttribute("aria-invalid");
});

test("does not set aria-errormessage when error text is not present", () => {
  render(<CheckboxControl label="Label" />);
  expect(screen.getByRole("checkbox")).not.toHaveAttribute("aria-errormessage");
});

test('sets data-show-validity="true" on the input when error text is present', () => {
  render(<CheckboxControl label="Label" errorText="Error text" />);
  expect(screen.getByRole("checkbox")).toHaveAttribute("data-show-validity", "true");
});

test('does not set data-show-validity="true" on the input when no error text is present', () => {
  render(<CheckboxControl label="Label" />);
  expect(screen.getByRole("checkbox")).not.toHaveAttribute("data-show-validity", "true");
});

test("respects an explicit showValidity={false} override even when error text is present", () => {
  render(<CheckboxControl label="Label" errorText="Error text" showValidity={false} />);
  expect(screen.getByRole("checkbox")).toHaveAttribute("data-show-validity", "false");
});

test("forwards a ref to the underlying checkbox input element", () => {
  const ref = { current: null };
  render(<CheckboxControl label="Label" ref={ref} />);
  expect(ref.current).toBe(screen.getByRole("checkbox"));
});
