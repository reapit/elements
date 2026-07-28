import { fireEvent, render, screen } from "@testing-library/react";

import { ComboboxCard } from "../card";

test("renders a combobox button", () => {
  render(
    <ComboboxCard aria-controls="listbox" aria-expanded={false}>
      Content
    </ComboboxCard>,
  );
  expect(screen.getByRole("combobox")).toBeVisible();
});

test("displays children content", () => {
  render(
    <ComboboxCard aria-controls="listbox" aria-expanded={false}>
      Test content
    </ComboboxCard>,
  );
  expect(screen.getByText("Test content")).toBeVisible();
});

test("displays action when provided", () => {
  render(
    <ComboboxCard
      action={<button aria-label="Clear">×</button>}
      aria-controls="listbox"
      aria-expanded={false}
    >
      Content
    </ComboboxCard>,
  );
  expect(screen.getByRole("button", { name: "Clear" })).toBeVisible();
});

test("does not render action container when action is not provided", () => {
  const { container } = render(
    <ComboboxCard aria-controls="listbox" aria-expanded={false}>
      Content
    </ComboboxCard>,
  );
  const actionContainer = container.querySelector('[class*="ElComboboxCardActionContainer"]');
  expect(actionContainer).toBeNull();
});

test("applies aria-controls to the combobox button", () => {
  render(
    <ComboboxCard aria-controls="my-listbox" aria-expanded={false}>
      Content
    </ComboboxCard>,
  );
  expect(screen.getByRole("combobox")).toHaveAttribute("aria-controls", "my-listbox");
});

test("applies aria-expanded to the combobox button as specified", () => {
  render(
    <ComboboxCard aria-controls="listbox" aria-expanded={true}>
      Content
    </ComboboxCard>,
  );
  expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true");
});

test('sets aria-autocomplete to "list"', () => {
  render(
    <ComboboxCard aria-controls="listbox" aria-expanded={false}>
      Content
    </ComboboxCard>,
  );
  expect(screen.getByRole("combobox")).toHaveAttribute("aria-autocomplete", "list");
});

test('sets aria-haspopup to "dialog"', () => {
  render(
    <ComboboxCard aria-controls="listbox" aria-expanded={false}>
      Content
    </ComboboxCard>,
  );
  expect(screen.getByRole("combobox")).toHaveAttribute("aria-haspopup", "dialog");
});

test('sets aria-disabled to "true" by default', () => {
  render(
    <ComboboxCard aria-controls="listbox" aria-expanded={false}>
      Content
    </ComboboxCard>,
  );
  expect(screen.getByRole("combobox")).toHaveAttribute("aria-disabled", "true");
});

test("allows aria-disabled to be overridden", () => {
  render(
    <ComboboxCard aria-controls="listbox" aria-disabled={false} aria-expanded={false}>
      Content
    </ComboboxCard>,
  );
  expect(screen.getByRole("combobox")).toHaveAttribute("aria-disabled", "false");
});

test('sets button type to "button"', () => {
  render(
    <ComboboxCard aria-controls="listbox" aria-expanded={false}>
      Content
    </ComboboxCard>,
  );
  expect(screen.getByRole("combobox")).toHaveAttribute("type", "button");
});

test("applies data-size with the specified size", () => {
  const { container } = render(
    <ComboboxCard aria-controls="listbox" aria-expanded={false} size="small">
      Content
    </ComboboxCard>,
  );
  expect(container.firstElementChild).toHaveAttribute("data-size", "small");
});

test('defaults to "medium" size when size prop is omitted', () => {
  const { container } = render(
    <ComboboxCard aria-controls="listbox" aria-expanded={false}>
      Content
    </ComboboxCard>,
  );
  expect(container.firstElementChild).toHaveAttribute("data-size", "medium");
});

test("forwards id prop to the combobox button", () => {
  render(
    <ComboboxCard aria-controls="listbox" aria-expanded={false} id="my-combobox">
      Content
    </ComboboxCard>,
  );
  expect(screen.getByRole("combobox")).toHaveAttribute("id", "my-combobox");
});

test("applies className to the container div", () => {
  const { container } = render(
    <ComboboxCard aria-controls="listbox" aria-expanded={false} className="custom-class">
      Content
    </ComboboxCard>,
  );
  expect(container.firstElementChild).toHaveClass("custom-class");
});

test("applies style to the container div", () => {
  const { container } = render(
    <ComboboxCard aria-controls="listbox" aria-expanded={false} style={{ color: "red" }}>
      Content
    </ComboboxCard>,
  );
  expect(container.firstElementChild).toHaveStyle({ color: "red" });
});

test("does not call onClick handler when aria-disabled", () => {
  const onClick = vi.fn();
  render(
    <ComboboxCard aria-controls="listbox" aria-expanded={false} onClick={onClick}>
      Content
    </ComboboxCard>,
  );

  fireEvent.click(screen.getByRole("combobox"));

  expect(onClick).not.toHaveBeenCalled();
});

test('calls onClick handler when aria-disabled="false"', () => {
  const onClick = vi.fn();
  render(
    <ComboboxCard
      aria-controls="listbox"
      aria-disabled={false}
      aria-expanded={false}
      onClick={onClick}
    >
      Content
    </ComboboxCard>,
  );

  fireEvent.click(screen.getByRole("combobox"));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("forwards additional props to the combobox button", () => {
  render(
    <ComboboxCard aria-controls="listbox" aria-expanded={false} data-testid="my-button">
      Content
    </ComboboxCard>,
  );
  expect(screen.getByTestId("my-button")).toBeVisible();
});
