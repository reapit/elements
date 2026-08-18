import { render, screen } from "@testing-library/react";

import { ComboboxButton } from "../button";

test("renders a button element in a container div", () => {
  const { container } = render(
    <ComboboxButton aria-controls="popup" aria-expanded={false} id="my-button" />,
  );
  expect(container.firstElementChild?.tagName).toBe("DIV");
  expect(screen.getByRole("combobox")).toBeVisible();
  expect(screen.getByRole("combobox")).toHaveAttribute("type", "button");
  expect(screen.getByRole("combobox").parentElement).toBe(container.firstElementChild);
});

test("displays children when provided", () => {
  render(
    <ComboboxButton aria-controls="popup" aria-expanded={false} id="my-button">
      John Smith
    </ComboboxButton>,
  );
  expect(screen.getByRole("combobox")).toHaveTextContent("John Smith");
});

test("displays placeholder text when no children provided", () => {
  render(
    <ComboboxButton
      aria-controls="popup"
      aria-expanded={false}
      id="my-button"
      placeholder="Choose one"
    />,
  );
  expect(screen.getByRole("combobox")).toHaveTextContent("Choose one");
});

test('uses "Select an option" as default placeholder', () => {
  render(<ComboboxButton aria-controls="popup" aria-expanded={false} id="my-button" />);
  expect(screen.getByRole("combobox")).toHaveTextContent("Select an option");
});

test("uses medium size by default", () => {
  const { container } = render(
    <ComboboxButton aria-controls="popup" aria-expanded={false} id="my-button" />,
  );
  expect(container.firstElementChild).toHaveAttribute("data-size", "medium");
});

test("applies correct size when specified", () => {
  const { container } = render(
    <ComboboxButton aria-controls="popup" aria-expanded={false} id="my-button" size="small" />,
  );
  expect(container.firstElementChild).toHaveAttribute("data-size", "small");
});

test("applies aria-controls attribute to the button", () => {
  render(<ComboboxButton aria-controls="my-popup" aria-expanded={false} id="my-button" />);
  expect(screen.getByRole("combobox")).toHaveAttribute("aria-controls", "my-popup");
});

test("applies aria-expanded attribute to the button", () => {
  render(<ComboboxButton aria-controls="popup" aria-expanded={true} id="my-button" />);
  expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true");
});

test("displays leading icon when supplied", () => {
  render(
    <ComboboxButton
      aria-controls="popup"
      aria-expanded={false}
      id="my-button"
      leadingIcon="leading icon"
    />,
  );
  expect(screen.getByText("leading icon")).toBeVisible();
});

test("displays action when supplied", () => {
  render(
    <ComboboxButton action="action" aria-controls="popup" aria-expanded={false} id="my-button" />,
  );
  expect(screen.getByText("action")).toBeVisible();
});

test('applies role="combobox" to the button', () => {
  render(<ComboboxButton aria-controls="popup" aria-expanded={false} id="my-button" />);
  expect(screen.getByRole("combobox")).toBeVisible();
});

test('applies aria-autocomplete="list" to the button', () => {
  render(<ComboboxButton aria-controls="popup" aria-expanded={false} id="my-button" />);
  expect(screen.getByRole("combobox")).toHaveAttribute("aria-autocomplete", "list");
});

test('applies aria-haspopup="dialog" to the button', () => {
  render(<ComboboxButton aria-controls="popup" aria-expanded={false} id="my-button" />);
  expect(screen.getByRole("combobox")).toHaveAttribute("aria-haspopup", "dialog");
});

test('has type="button"', () => {
  render(<ComboboxButton aria-controls="popup" aria-expanded={false} id="my-button" />);
  expect(screen.getByRole("combobox")).toHaveAttribute("type", "button");
});

test("uses provided id prop", () => {
  render(<ComboboxButton aria-controls="popup" aria-expanded={false} id="my-button" />);
  expect(screen.getByRole("combobox")).toHaveAttribute("id", "my-button");
});

test("displays children instead of placeholder when children are provided", () => {
  render(
    <ComboboxButton
      aria-controls="popup"
      aria-expanded={false}
      id="my-button"
      placeholder="Select an option"
    >
      Selected value
    </ComboboxButton>,
  );
  expect(screen.getByRole("combobox")).toHaveTextContent("Selected value");
  expect(screen.getByRole("combobox")).not.toHaveTextContent("Select an option");
});

test('label container has data-has-selection="true" when children are provided', () => {
  const { container } = render(
    <ComboboxButton aria-controls="popup" aria-expanded={false} id="my-button">
      Selected value
    </ComboboxButton>,
  );
  const labelContainer = container.querySelector("button > span");
  expect(labelContainer).toHaveAttribute("data-has-selection", "true");
});

test('label container has data-has-selection="false" when no children are provided', () => {
  const { container } = render(
    <ComboboxButton
      aria-controls="popup"
      aria-expanded={false}
      id="my-button"
      placeholder="Choose one"
    />,
  );
  const labelContainer = container.querySelector("button > span");
  expect(labelContainer).toHaveAttribute("data-has-selection", "false");
});

test("forwards `className` to the root container element", () => {
  const { container } = render(
    <ComboboxButton
      aria-controls="popup"
      aria-expanded={false}
      className="my-class"
      id="my-button"
    />,
  );
  expect(container.firstElementChild).toHaveClass("my-class");
  expect(screen.getByRole("combobox")).not.toHaveClass("my-class");
});

test("forwards `style` to the root container element", () => {
  const { container } = render(
    <ComboboxButton
      aria-controls="popup"
      aria-expanded={false}
      style={{ color: "red" }}
      id="my-button"
    />,
  );
  expect(container.firstElementChild).toHaveStyle("color: red");
});

test("forwards additional props to the button element", () => {
  render(
    <ComboboxButton
      aria-controls="popup"
      aria-expanded={false}
      data-testid="test-id"
      id="my-button"
    />,
  );
  expect(screen.getByRole("combobox")).toHaveAttribute("data-testid", "test-id");
});

test("exposes ComboboxButton.ClearButton", () => {
  expect(ComboboxButton.ClearButton).toBeDefined();
});

test("exposes ComboboxButton.TogglePopupButton", () => {
  expect(ComboboxButton.OpenPopupButton).toBeDefined();
});

test('applies data-variant="default" to the container by default', () => {
  const { container } = render(
    <ComboboxButton aria-controls="popup" aria-expanded={false} id="my-button" />,
  );
  expect(container.firstElementChild).toHaveAttribute("data-variant", "default");
});

test('applies data-variant="default" to the container when variant="default"', () => {
  const { container } = render(
    <ComboboxButton aria-controls="popup" aria-expanded={false} id="my-button" variant="default" />,
  );
  expect(container.firstElementChild).toHaveAttribute("data-variant", "default");
});

test('applies data-variant="borderless" to the container when variant="borderless"', () => {
  const { container } = render(
    <ComboboxButton
      aria-controls="popup"
      aria-expanded={false}
      id="my-button"
      variant="borderless"
    />,
  );
  expect(container.firstElementChild).toHaveAttribute("data-variant", "borderless");
});
