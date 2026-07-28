import { render, screen } from "@testing-library/react";

import { Textarea } from "../textarea";

test("renders a textbox element regardless of chosen `fieldSizing`", () => {
  const { rerender } = render(<Textarea fieldSizing="fixed" />);
  expect(screen.getByRole("textbox")).toBeVisible();

  rerender(<Textarea fieldSizing="content" />);
  expect(screen.getByRole("textbox")).toBeVisible();

  rerender(<Textarea fieldSizing="manual" />);
  expect(screen.getByRole("textbox")).toBeVisible();
});
