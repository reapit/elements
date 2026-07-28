import { determineSearchInputVariant } from "../determine-search-input-variant";

test('returns "borderless" when popupVariant is "drawer"', () => {
  const result = determineSearchInputVariant({
    isXSBreakpoint: false,
    popupVariant: "drawer",
  });
  expect(result).toBe("borderless");
});

test('returns "borderless" when popupVariant is "drawer" regardless of breakpoint', () => {
  const result = determineSearchInputVariant({
    isXSBreakpoint: true,
    popupVariant: "drawer",
  });
  expect(result).toBe("borderless");
});

test('returns "default" when popupVariant is "popover"', () => {
  const result = determineSearchInputVariant({
    isXSBreakpoint: false,
    popupVariant: "popover",
  });
  expect(result).toBe("default");
});

test('returns "default" when popupVariant is "popover" regardless of breakpoint', () => {
  const result = determineSearchInputVariant({
    isXSBreakpoint: true,
    popupVariant: "popover",
  });
  expect(result).toBe("default");
});

test('returns "borderless" when popupVariant is "auto" and isXSBreakpoint is true', () => {
  const result = determineSearchInputVariant({
    isXSBreakpoint: true,
    popupVariant: "auto",
  });
  expect(result).toBe("borderless");
});

test('returns "default" when popupVariant is "auto" and isXSBreakpoint is false', () => {
  const result = determineSearchInputVariant({
    isXSBreakpoint: false,
    popupVariant: "auto",
  });
  expect(result).toBe("default");
});
