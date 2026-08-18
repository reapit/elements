import { parseConstraints, validateRange } from "../validate-range";

// ---------------------------------------------------------------------------
// parseConstraints
// ---------------------------------------------------------------------------

test("returns NaN for both constraints when neither is provided", () => {
  const { parsedMin, parsedMax } = parseConstraints();
  expect(Number.isNaN(parsedMin)).toBe(true);
  expect(Number.isNaN(parsedMax)).toBe(true);
});

test("returns NaN when min is an empty string", () => {
  const { parsedMin } = parseConstraints("");
  expect(Number.isNaN(parsedMin)).toBe(true);
});

test("returns NaN when max is an empty string", () => {
  const { parsedMax } = parseConstraints(undefined, "");
  expect(Number.isNaN(parsedMax)).toBe(true);
});

test("returns NaN when min is a non-numeric string", () => {
  const { parsedMin } = parseConstraints("abc");
  expect(Number.isNaN(parsedMin)).toBe(true);
});

test("parses a numeric min string", () => {
  expect(parseConstraints("5").parsedMin).toBe(5);
});

test("parses a numeric max string", () => {
  expect(parseConstraints(undefined, "100").parsedMax).toBe(100);
});

test("parses numeric min and max numbers directly", () => {
  const { parsedMin, parsedMax } = parseConstraints(0, 100);
  expect(parsedMin).toBe(0);
  expect(parsedMax).toBe(100);
});

test("allowNegative is true when min is not provided", () => {
  expect(parseConstraints().allowNegative).toBe(true);
});

test("allowNegative is true when min is a non-numeric string", () => {
  expect(parseConstraints("abc").allowNegative).toBe(true);
});

test("allowNegative is true when min is negative", () => {
  expect(parseConstraints(-100).allowNegative).toBe(true);
});

test("allowNegative is false when min is 0", () => {
  expect(parseConstraints(0).allowNegative).toBe(false);
});

test("allowNegative is false when min is a positive number", () => {
  expect(parseConstraints(1).allowNegative).toBe(false);
});

test("returns NaN when min is a whitespace-only string", () => {
  const { parsedMin } = parseConstraints(" ");
  expect(Number.isNaN(parsedMin)).toBe(true);
});

test("allowNegative is true when min is a whitespace-only string", () => {
  expect(parseConstraints(" ").allowNegative).toBe(true);
});

test('returns NaN when min is "Infinity"', () => {
  const { parsedMin } = parseConstraints("Infinity");
  expect(Number.isNaN(parsedMin)).toBe(true);
});

test('allowNegative is true when min is "Infinity"', () => {
  expect(parseConstraints("Infinity").allowNegative).toBe(true);
});

test("returns NaN when min is the number Infinity", () => {
  const { parsedMin } = parseConstraints(Infinity);
  expect(Number.isNaN(parsedMin)).toBe(true);
});

test('returns NaN when max is "Infinity"', () => {
  const { parsedMax } = parseConstraints(undefined, "Infinity");
  expect(Number.isNaN(parsedMax)).toBe(true);
});

// ---------------------------------------------------------------------------
// validateRange
// ---------------------------------------------------------------------------

test('returns "" for an empty string', () => {
  expect(validateRange("", 0, 100)).toBe("");
});

test('returns "" for "-" (partial input)', () => {
  expect(validateRange("-", 0, 100)).toBe("");
});

test('returns "badInput" for a non-numeric string', () => {
  expect(validateRange("abc", 0, 100)).toBe("badInput");
});

test('returns "badInput" for "." (lone decimal point)', () => {
  expect(validateRange(".", 0, 100)).toBe("badInput");
});

test('returns "badInput" for "-." (minus followed by decimal point)', () => {
  expect(validateRange("-.", 0, 100)).toBe("badInput");
});

test('returns "" when value is within range', () => {
  expect(validateRange("5", 0, 10)).toBe("");
});

test('returns "" when value equals min', () => {
  expect(validateRange("0", 0, 10)).toBe("");
});

test('returns "" when value equals max', () => {
  expect(validateRange("10", 0, 10)).toBe("");
});

test('returns "rangeUnderflow" when value is below min', () => {
  expect(validateRange("-1", 0, 10)).toBe("rangeUnderflow");
});

test('returns "rangeOverflow" when value is above max', () => {
  expect(validateRange("11", 0, 10)).toBe("rangeOverflow");
});

test('returns "" when min is NaN (no lower bound)', () => {
  expect(validateRange("-999", NaN, 100)).toBe("");
});

test('returns "" when max is NaN (no upper bound)', () => {
  expect(validateRange("999", 0, NaN)).toBe("");
});

test('returns "" when both constraints are NaN', () => {
  expect(validateRange("42", NaN, NaN)).toBe("");
});

test('returns "rangeUnderflow" for a negative decimal below min', () => {
  expect(validateRange("-0.5", 0, 10)).toBe("rangeUnderflow");
});

test('returns "rangeOverflow" for a decimal above max', () => {
  expect(validateRange("10.1", 0, 10)).toBe("rangeOverflow");
});
