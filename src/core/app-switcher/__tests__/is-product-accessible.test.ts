import { isProductAccessible } from "../is-product-accessible";

// NOTE: product IDs in the accessibleProductIds array can have mixed casing
const accessibleProductIds = ["CONSOLECLOUD", "ireWeb"];

test("returns true when product ID is accessible", () => {
  expect(isProductAccessible("ireWeb", accessibleProductIds)).toBe(true);
  expect(isProductAccessible("consoleCloud", accessibleProductIds)).toBe(true);
});

test("returns true when product ID is accessible despite different casing", () => {
  expect(isProductAccessible("consoleCloud", accessibleProductIds)).toBe(true);
});

test("returns false when product ID is NOT accessible", () => {
  expect(isProductAccessible("agentBox", accessibleProductIds)).toBe(false);
});
