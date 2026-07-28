import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

import { PageLayoutContext } from "../../context";
import { PageLayoutBodyRegion } from "../body-region";

test("renders a main element", () => {
  render(<PageLayoutBodyRegion />, { wrapper });
  expect(screen.getByRole("main")).toBeVisible();
});

test('has data-overflow="auto" attribute when scroll="body"', () => {
  render(<PageLayoutBodyRegion />, {
    wrapper: ({ children }) => (
      <PageLayoutContext.Provider value={{ rootId: "test-id", scroll: "body" }}>
        {children}
      </PageLayoutContext.Provider>
    ),
  });
  expect(screen.getByRole("main")).toHaveAttribute("data-overflow", "auto");
});

test('does NOT have data-overflow attribute when scroll="self"', () => {
  render(<PageLayoutBodyRegion />, {
    wrapper: ({ children }) => (
      <PageLayoutContext.Provider value={{ rootId: "test-id", scroll: "self" }}>
        {children}
      </PageLayoutContext.Provider>
    ),
  });
  expect(screen.getByRole("main")).not.toHaveAttribute("data-overflow");
});

test("forwards additional attributes to the div element", () => {
  render(<PageLayoutBodyRegion data-testid="test-id" />, { wrapper });
  expect(screen.getByTestId("test-id")).toBe(screen.getByRole("main"));
});

function wrapper({ children }: { children: ReactNode }) {
  return (
    <PageLayoutContext.Provider value={{ rootId: "test-id", scroll: "self" }}>
      {children}
    </PageLayoutContext.Provider>
  );
}
