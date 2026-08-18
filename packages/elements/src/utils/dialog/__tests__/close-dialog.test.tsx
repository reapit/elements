import { render, screen } from "@testing-library/react";

import { closeDialog } from "../close-dialog";

afterEach(() => {
  document.body.innerHTML = "";
});

test("hides a dialog element by calling close()", () => {
  render(<dialog open data-testid="test-dialog" />);
  const dialog = screen.getByTestId("test-dialog");

  closeDialog(dialog as HTMLDialogElement);

  expect(dialog).not.toBeVisible();
});

test("hides a dialog element by ID", () => {
  render(<dialog open id="test-dialog" data-testid="test-dialog" />);
  closeDialog("test-dialog");

  expect(screen.getByTestId("test-dialog")).not.toBeVisible();
});

test("throws error when element is not found by ID", () => {
  expect(() => closeDialog("non-existent")).toThrow(
    'closeDialog: Element with ID "non-existent" not found in the DOM',
  );
});

test("throws error when element passed by reference is null", () => {
  expect(() => closeDialog(null as unknown as HTMLDialogElement)).toThrow(
    "closeDialog: Element (passed by reference) not found in the DOM",
  );
});

test("throws error when element passed by reference is not an HTMLDialogElement", () => {
  const div = document.createElement("div");
  document.body.appendChild(div);

  expect(() => closeDialog(div as unknown as HTMLDialogElement)).toThrow(
    "closeDialog: Element (passed by reference) is not an HTMLDialogElement",
  );
});

test("throws error when element is not an HTMLDialogElement (by ID)", () => {
  const div = document.createElement("div");
  div.id = "test-popup";
  document.body.appendChild(div);

  expect(() => closeDialog("test-popup")).toThrow(
    'closeDialog: Element with ID "test-popup" is not an HTMLDialogElement',
  );
});
