import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

import { DialogContext } from "../../context";
import { DialogHeader } from "../header";

test("renders a header element with the expected content", () => {
  render(<DialogHeader>Test Title</DialogHeader>, { wrapper });
  expect(screen.getByText("Test Title")).toBeVisible();
});

test("renders action when provided", () => {
  render(<DialogHeader action="Test Action">Test Title</DialogHeader>, { wrapper });
  expect(screen.getByText("Test Action")).toBeVisible();
});

test("forwards additional props to the header element", () => {
  render(<DialogHeader data-testid="test-id">Test Title</DialogHeader>, { wrapper });
  expect(screen.getByTestId("test-id")).toBeVisible();
});

function wrapper({ children }: { children: ReactNode }) {
  return (
    <DialogContext.Provider value={{ titleId: "test-title-id" }}>{children}</DialogContext.Provider>
  );
}
