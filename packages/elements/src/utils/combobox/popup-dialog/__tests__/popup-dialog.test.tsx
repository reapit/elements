import { fireEvent, render, screen } from "@testing-library/react";

import { ComboboxPopupDialog } from "../popup-dialog";

test("renders as a dialog element", () => {
  render(
    // In all these tests, we render the dialog with `open` so that it, and its content, are visible.
    <ComboboxPopupDialog {...defaultProps}>Content</ComboboxPopupDialog>,
  );
  expect(screen.getByRole("dialog")).toBeVisible();
});

test("renders its children", () => {
  render(<ComboboxPopupDialog {...defaultProps}>Content</ComboboxPopupDialog>);
  expect(screen.getByText("Content")).toBeVisible();
});

test("applies aria-labelledby attribute", () => {
  render(<ComboboxPopupDialog {...defaultProps}>Content</ComboboxPopupDialog>);
  expect(screen.getByRole("dialog")).toHaveAttribute("aria-labelledby", "label-id");
});

test("applies id attribute", () => {
  render(<ComboboxPopupDialog {...defaultProps}>Content</ComboboxPopupDialog>);
  expect(screen.getByRole("dialog")).toHaveAttribute("id", "popup-id");
});

test("applies auto variant by default", () => {
  render(<ComboboxPopupDialog {...defaultProps}>Content</ComboboxPopupDialog>);
  expect(screen.getByRole("dialog")).toHaveAttribute("data-variant", "auto");
});

test("applies custom data-variant attribute", () => {
  render(
    <ComboboxPopupDialog {...defaultProps} variant="drawer">
      Content
    </ComboboxPopupDialog>,
  );
  expect(screen.getByRole("dialog")).toHaveAttribute("data-variant", "drawer");
});

test('consumes backdrop clicks (closedby="closerequest") in drawer variant, where the backdrop is dimmed', () => {
  render(
    <ComboboxPopupDialog {...defaultProps} variant="drawer">
      Content
    </ComboboxPopupDialog>,
  );
  expect(screen.getByRole("dialog")).toHaveAttribute("closedby", "closerequest");
});

test('does not consume backdrop clicks (closedby="any") in popover variant, where the backdrop is transparent', () => {
  render(
    <ComboboxPopupDialog {...defaultProps} variant="popover">
      Content
    </ComboboxPopupDialog>,
  );
  expect(screen.getByRole("dialog")).toHaveAttribute("closedby", "any");
});

test("accepts maxHeight prop", () => {
  render(
    <ComboboxPopupDialog {...defaultProps} maxHeight="500px">
      Content
    </ComboboxPopupDialog>,
  );
  expect(screen.getByRole("dialog")).toHaveStyle("max-height: 500px");
});

test("accepts maxWidth prop", () => {
  render(
    <ComboboxPopupDialog {...defaultProps} maxWidth="500px">
      Content
    </ComboboxPopupDialog>,
  );
  expect(screen.getByRole("dialog")).toHaveStyle("max-width: 500px");
});

test("accepts minWidth prop", () => {
  render(
    <ComboboxPopupDialog {...defaultProps} minWidth="500px">
      Content
    </ComboboxPopupDialog>,
  );
  expect(screen.getByRole("dialog")).toHaveStyle("min-width: 500px");
});

test("calls onClick handler when provided", () => {
  const onClick = vi.fn();
  render(
    <ComboboxPopupDialog {...defaultProps} onClick={onClick}>
      Content
    </ComboboxPopupDialog>,
  );

  fireEvent.click(screen.getByRole("dialog"));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test("forwards additional props to dialog", () => {
  render(
    <ComboboxPopupDialog {...defaultProps} data-testid="custom-dialog">
      Content
    </ComboboxPopupDialog>,
  );
  expect(screen.getByTestId("custom-dialog")).toBe(screen.getByRole("dialog"));
});

test("exposes open static method", () => {
  expect(ComboboxPopupDialog.open).toBeDefined();
});

test("exposes close static method", () => {
  expect(ComboboxPopupDialog.close).toBeDefined();
});

test("exposes Context", () => {
  expect(ComboboxPopupDialog.Context).toBeDefined();
});

test("exposes useContext", () => {
  expect(ComboboxPopupDialog.useContext).toBeDefined();
});

test("calls onCancel handler when provided", () => {
  const onCancel = vi.fn();
  render(
    <ComboboxPopupDialog {...defaultProps} onCancel={onCancel}>
      Content
    </ComboboxPopupDialog>,
  );

  fireEvent(screen.getByRole("dialog"), new Event("cancel", { bubbles: true }));
  expect(onCancel).toHaveBeenCalledTimes(1);
});

test("stops propagation of cancel event", () => {
  const onCancel = vi.fn();
  render(
    <ComboboxPopupDialog {...defaultProps} onCancel={onCancel}>
      Content
    </ComboboxPopupDialog>,
  );

  const dialog = screen.getByRole("dialog");
  const cancelEvent = new Event("cancel", { bubbles: true, cancelable: true });
  const stopPropagationSpy = vi.spyOn(cancelEvent, "stopPropagation");

  fireEvent(dialog, cancelEvent);

  expect(onCancel).toHaveBeenCalledTimes(1);
  expect(stopPropagationSpy).toHaveBeenCalledTimes(1);
});

test("calls onClose handler when provided", () => {
  const onClose = vi.fn();
  render(
    <ComboboxPopupDialog {...defaultProps} onClose={onClose}>
      Content
    </ComboboxPopupDialog>,
  );

  fireEvent(screen.getByRole("dialog"), new Event("close", { bubbles: true }));
  expect(onClose).toHaveBeenCalledTimes(1);
});

test("stops propagation of close event", () => {
  const onClose = vi.fn();
  render(
    <ComboboxPopupDialog {...defaultProps} onClose={onClose}>
      Content
    </ComboboxPopupDialog>,
  );

  const dialog = screen.getByRole("dialog");
  const closeEvent = new Event("close", { bubbles: true, cancelable: true });
  const stopPropagationSpy = vi.spyOn(closeEvent, "stopPropagation");

  fireEvent(dialog, closeEvent);

  expect(onClose).toHaveBeenCalledTimes(1);
  expect(stopPropagationSpy).toHaveBeenCalledTimes(1);
});

const defaultProps = {
  "aria-labelledby": "label-id",
  id: "popup-id",
  open: true,
} satisfies Partial<ComboboxPopupDialog.Props>;
