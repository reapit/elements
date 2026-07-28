import { AtAGlance } from "../at-a-glance";

// Base polymorphic Card
test("exposes AtAGlance.Card", () => {
  expect(AtAGlance.Card).toBeDefined();
});

// Subcomponents for base Card
test("exposes AtAGlance.CardIcon", () => {
  expect(AtAGlance.CardIcon).toBeDefined();
});

test("exposes AtAGlance.CardLabel", () => {
  expect(AtAGlance.CardLabel).toBeDefined();
});

test("exposes AtAGlance.CardDescription", () => {
  expect(AtAGlance.CardDescription).toBeDefined();
});

test("exposes AtAGlance.CardValue", () => {
  expect(AtAGlance.CardValue).toBeDefined();
});

// Element-specific cards
test("exposes AtAGlance.ArticleCard", () => {
  expect(AtAGlance.ArticleCard).toBeDefined();
});

test("exposes AtAGlance.AnchorCard", () => {
  expect(AtAGlance.AnchorCard).toBeDefined();
});

test("exposes AtAGlance.ButtonCard", () => {
  expect(AtAGlance.ButtonCard).toBeDefined();
});

// Other components
test("exposes AtAGlance.Carousel", () => {
  expect(AtAGlance.Carousel).toBeDefined();
});

test("exposes AtAGlance.Grid", () => {
  expect(AtAGlance.Grid).toBeDefined();
});

test("exposes AtAGlance.GridItem", () => {
  expect(AtAGlance.GridItem).toBeDefined();
});

test("exposes AtAGlance.Header", () => {
  expect(AtAGlance.Header).toBeDefined();
});

test("exposes AtAGlance.Listbox", () => {
  expect(AtAGlance.Listbox).toBeDefined();
});

test("exposes AtAGlance.ListboxOption", () => {
  expect(AtAGlance.ListboxOption).toBeDefined();
});
