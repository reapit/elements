import { fireEvent, render, screen } from "@testing-library/react";

import { FileUploaderRemoveButton } from "../remove-button";

test("is labelled with the caller-provided accessible name", () => {
  render(<FileUploaderRemoveButton aria-label="Remove Invoice.pdf" onClick={() => {}} />);
  expect(screen.getByRole("button", { name: "Remove Invoice.pdf" })).toBeVisible();
});

test("calls onClick when clicked", () => {
  const onClick = vi.fn();
  render(<FileUploaderRemoveButton aria-label="Remove Invoice.pdf" onClick={onClick} />);

  fireEvent.click(screen.getByRole("button"));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test('defaults to type="button" so it does not submit an enclosing form', () => {
  render(<FileUploaderRemoveButton aria-label="Remove Invoice.pdf" onClick={() => {}} />);
  expect(screen.getByRole("button")).toHaveAttribute("type", "button");
});
