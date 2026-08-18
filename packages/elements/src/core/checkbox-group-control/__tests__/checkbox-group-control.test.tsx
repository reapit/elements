import { render, screen } from "@testing-library/react";

import { CheckboxGroupControl } from "../checkbox-group-control";

test("renders a group", () => {
  render(<CheckboxGroupControl>Child</CheckboxGroupControl>);
  expect(screen.getByRole("group")).toBeVisible();
});

test("displays the provided children", () => {
  render(<CheckboxGroupControl>Child</CheckboxGroupControl>);
  expect(screen.getByText("Child")).toBeVisible();
});

test("is labelled by the label text, when provided", () => {
  render(<CheckboxGroupControl label="Group label">Child</CheckboxGroupControl>);
  expect(screen.getByRole("group", { name: "Group label" })).toBeVisible();
});

test("is described by the help text, when provided and no error is present", () => {
  render(<CheckboxGroupControl helpText="Help text">Child</CheckboxGroupControl>);
  const group = screen.getByRole("group");
  expect(group).toHaveAttribute("aria-describedby");
  expect(group).toHaveAccessibleDescription("Help text");
  expect(group).not.toHaveAttribute("aria-errormessage");
  expect(group).not.toHaveAttribute("aria-invalid");
});

test("is described by the error text via aria-errormessage, when provided", () => {
  render(
    <CheckboxGroupControl helpText="Help text" errorText="Error text">
      Child
    </CheckboxGroupControl>,
  );
  expect(screen.getByRole("group")).toHaveAccessibleErrorMessage("Error text");
});

test("displays label text, when provided", () => {
  render(<CheckboxGroupControl label="Group label">Child</CheckboxGroupControl>);
  expect(screen.getByText("Group label")).toBeVisible();
});

test("displays help text, when provided", () => {
  render(<CheckboxGroupControl helpText="Help text">Child</CheckboxGroupControl>);
  expect(screen.getByText("Help text")).toBeVisible();
});

test("displays error text, when provided", () => {
  render(<CheckboxGroupControl errorText="Error text">Child</CheckboxGroupControl>);
  expect(screen.getByText("Error text")).toBeVisible();
});

test("does NOT display the help text when error text is present", () => {
  render(
    <CheckboxGroupControl helpText="Help text" errorText="Error text">
      Child
    </CheckboxGroupControl>,
  );
  expect(screen.queryByText("Help text")).not.toBeInTheDocument();
});

test('has data-orientation="vertical" by default', () => {
  render(<CheckboxGroupControl>Child</CheckboxGroupControl>);
  // NOTE: we're relying on implementation details here (the fact we know the text will be the direct
  // descendant of the element we're looking for), but the element that handles the layout is not
  // otherwise accessible.
  expect(screen.getByText("Child")).toHaveAttribute("data-orientation", "vertical");
});

test('applies data-orientation="horizontal" when specified', () => {
  render(
    <CheckboxGroupControl orientation="horizontal" data-testid="group">
      Child
    </CheckboxGroupControl>,
  );
  // NOTE: we're relying on implementation details here (the fact we know the text will be the direct
  // descendant of the element we're looking for), but the element that handles the layout is not
  // otherwise accessible.
  expect(screen.getByText("Child")).toHaveAttribute("data-orientation", "horizontal");
});

test("forwards additional attributes to the div element", () => {
  const { container } = render(
    <CheckboxGroupControl data-testid="group">Child</CheckboxGroupControl>,
  );
  expect(container.firstElementChild).toBe(screen.getByTestId("group"));
});

test("sets aria-invalid to true when error text is present", () => {
  render(<CheckboxGroupControl errorText="Error text">Child</CheckboxGroupControl>);
  expect(screen.getByRole("group")).toHaveAttribute("aria-invalid", "true");
});

test("does not set aria-invalid when error text is not present", () => {
  render(<CheckboxGroupControl>Child</CheckboxGroupControl>);
  expect(screen.getByRole("group")).not.toHaveAttribute("aria-invalid");
});

test("does not set aria-errormessage when error text is not present", () => {
  render(<CheckboxGroupControl helpText="Help text">Child</CheckboxGroupControl>);
  expect(screen.getByRole("group")).not.toHaveAttribute("aria-errormessage");
});

test("does not set aria-describedby when error text is present", () => {
  render(
    <CheckboxGroupControl helpText="Help text" errorText="Error text">
      Child
    </CheckboxGroupControl>,
  );
  expect(screen.getByRole("group")).not.toHaveAttribute("aria-describedby");
});

test('sets data-show-validity="true" on option inputs when error text is present', () => {
  render(
    <CheckboxGroupControl errorText="Error text">
      <CheckboxGroupControl.Option label="Option" value="a" />
    </CheckboxGroupControl>,
  );
  expect(screen.getByRole("checkbox")).toHaveAttribute("data-show-validity", "true");
});

test('does not set data-show-validity="true" on option inputs when no error text is present', () => {
  render(
    <CheckboxGroupControl>
      <CheckboxGroupControl.Option label="Option" value="a" />
    </CheckboxGroupControl>,
  );
  expect(screen.getByRole("checkbox")).not.toHaveAttribute("data-show-validity", "true");
});

test("respects an explicit showValidity={false} override even when error text is present", () => {
  render(
    <CheckboxGroupControl errorText="Error text" showValidity={false}>
      <CheckboxGroupControl.Option label="Option" value="a" />
    </CheckboxGroupControl>,
  );
  expect(screen.getByRole("checkbox")).toHaveAttribute("data-show-validity", "false");
});
