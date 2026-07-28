import { render, screen } from "@testing-library/react";

import { FocusedLayoutProductLogo } from "../product-logo";

test("renders an element with correct accessible name", () => {
  render(<FocusedLayoutProductLogo product="Reapit PM" />);
  const element = screen.getByRole("img", { name: "Reapit PM" });
  expect(element).toBeVisible();
});

test("has the correct SVG descendant", () => {
  render(<FocusedLayoutProductLogo product="Reapit" />);
  const element = screen.getByRole("img");
  const svg = element.querySelector("svg");
  expect(svg).toBeVisible();
});

test("forwards additional props to the container element", () => {
  render(<FocusedLayoutProductLogo product="Reapit Forms" data-testid="product-logo" />);
  const element = screen.getByTestId("product-logo");
  expect(element).toBeVisible();
});

test("applies custom className", () => {
  render(<FocusedLayoutProductLogo product="Reapit" className="custom-class" />);
  const element = screen.getByRole("img");
  expect(element).toHaveClass("custom-class");
});

test("has the correct displayName", () => {
  expect(FocusedLayoutProductLogo.displayName).toBe("FocusedLayout.ProductLogo");
});
