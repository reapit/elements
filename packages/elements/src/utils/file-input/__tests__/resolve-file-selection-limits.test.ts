import { resolveFileSelectionLimits } from "../resolve-file-selection-limits";

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

test("defaults to single-select when neither maxFiles nor multiple is set", () => {
  expect(resolveFileSelectionLimits({})).toEqual({ multiple: false, maxFiles: 1 });
});

// ---------------------------------------------------------------------------
// multiple
// ---------------------------------------------------------------------------

test("resolves an unbounded maxFiles when multiple is true and maxFiles is unset", () => {
  expect(resolveFileSelectionLimits({ multiple: true })).toEqual({
    multiple: true,
    maxFiles: Infinity,
  });
});

test("resolves maxFiles to 1 when multiple is explicitly false and maxFiles is unset", () => {
  expect(resolveFileSelectionLimits({ multiple: false })).toEqual({ multiple: false, maxFiles: 1 });
});

// ---------------------------------------------------------------------------
// maxFiles inferring multiple
// ---------------------------------------------------------------------------

test("infers multiple when maxFiles is above 1 and multiple is unset", () => {
  expect(resolveFileSelectionLimits({ maxFiles: 5 })).toEqual({ multiple: true, maxFiles: 5 });
});

test("does not infer multiple when maxFiles is exactly 1", () => {
  expect(resolveFileSelectionLimits({ maxFiles: 1 })).toEqual({ multiple: false, maxFiles: 1 });
});

// ---------------------------------------------------------------------------
// Explicit values take precedence
// ---------------------------------------------------------------------------

test("keeps an explicit multiple:false even when maxFiles is above 1", () => {
  expect(resolveFileSelectionLimits({ maxFiles: 5, multiple: false })).toEqual({
    multiple: false,
    maxFiles: 5,
  });
});

test("keeps an explicit maxFiles even when multiple is true", () => {
  expect(resolveFileSelectionLimits({ maxFiles: 1, multiple: true })).toEqual({
    multiple: true,
    maxFiles: 1,
  });
});
