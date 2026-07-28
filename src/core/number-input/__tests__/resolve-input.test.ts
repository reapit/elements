import {
  classifyInputType,
  sanitisePastedText,
  resolvePaste,
  resolveKeystroke,
} from "../resolve-input";
import type { Selection } from "../resolve-input";

// ---------------------------------------------------------------------------
// classifyInputType
// ---------------------------------------------------------------------------

test('returns "ignore" when data is null', () => {
  expect(classifyInputType({ data: null, inputType: "insertText" })).toBe("ignore");
});

test('returns "ignore" for composition events', () => {
  expect(classifyInputType({ data: "a", inputType: "insertCompositionText" })).toBe("ignore");
});

test('returns "keystroke" for a single digit', () => {
  expect(classifyInputType({ data: "5", inputType: "insertText" })).toBe("keystroke");
});

test('returns "keystroke" for a single decimal separator', () => {
  expect(classifyInputType({ data: ".", inputType: "insertText" })).toBe("keystroke");
});

test('returns "keystroke" for a minus sign', () => {
  expect(classifyInputType({ data: "-", inputType: "insertText" })).toBe("keystroke");
});

test('returns "paste" for multi-character insertText', () => {
  expect(classifyInputType({ data: "123", inputType: "insertText" })).toBe("paste");
});

test('returns "paste" for insertFromPaste', () => {
  expect(classifyInputType({ data: "1", inputType: "insertFromPaste" })).toBe("paste");
});

test('returns "paste" for insertFromPasteAsQuotation', () => {
  expect(classifyInputType({ data: "1", inputType: "insertFromPasteAsQuotation" })).toBe("paste");
});

test('returns "paste" for insertFromYank', () => {
  expect(classifyInputType({ data: "1", inputType: "insertFromYank" })).toBe("paste");
});

test('returns "paste" for insertFromDrop', () => {
  expect(classifyInputType({ data: "1", inputType: "insertFromDrop" })).toBe("paste");
});

test('returns "paste" for insertReplacementText', () => {
  expect(classifyInputType({ data: "1", inputType: "insertReplacementText" })).toBe("paste");
});

// ---------------------------------------------------------------------------
// sanitisePastedText
// ---------------------------------------------------------------------------

const enSep = { decimal: ".", group: "," };
const deSep = { decimal: ",", group: "." };

test("strips group separators", () => {
  expect(sanitisePastedText("1,234,567", enSep)).toBe("1234567");
});

test('normalises locale decimal separator to "."', () => {
  expect(sanitisePastedText("1234,56", deSep)).toBe("1234.56");
});

test("strips group separators and normalises decimal", () => {
  expect(sanitisePastedText("1.234,56", deSep)).toBe("1234.56");
});

test("removes non-numeric characters", () => {
  expect(sanitisePastedText("$1,234.56", enSep)).toBe("1234.56");
});

test("truncates at the second decimal point, keeping the first fractional group", () => {
  expect(sanitisePastedText("1.2.3", enSep)).toBe("1.2");
});

test("truncates many decimal points to the first fractional group", () => {
  expect(sanitisePastedText("1.2.3.4", enSep)).toBe("1.2");
});

test("drops the fractional portion when decimals are disallowed", () => {
  expect(sanitisePastedText("12.99", enSep, 0)).toBe("12");
});

test("drops everything from the first separator when decimals are disallowed", () => {
  expect(sanitisePastedText("1.2.3.4", enSep, 0)).toBe("1");
});

test("normalises a locale decimal separator before truncating when decimals are disallowed", () => {
  expect(sanitisePastedText("12,99", deSep, 0)).toBe("12");
});

test("truncates the fractional part to maxFractionDigits digits", () => {
  expect(sanitisePastedText("1.23456", enSep, 2)).toBe("1.23");
});

test("does not truncate when maxFractionDigits is Infinity", () => {
  expect(sanitisePastedText("1.23456789", enSep, Infinity)).toBe("1.23456789");
});

test("accepts exactly maxFractionDigits digits without truncation", () => {
  expect(sanitisePastedText("1.12", enSep, 2)).toBe("1.12");
});

test("preserves a leading minus sign", () => {
  expect(sanitisePastedText("-1234.56", enSep)).toBe("-1234.56");
});

test("returns an integer string unchanged", () => {
  expect(sanitisePastedText("42", enSep)).toBe("42");
});

test("returns empty string for whitespace-only input", () => {
  expect(sanitisePastedText("   ", enSep)).toBe("");
});

// ---------------------------------------------------------------------------
// resolvePaste
// ---------------------------------------------------------------------------

const empty: Selection = { start: 0, end: 0 };

test("commits a valid integer paste into an empty input", () => {
  const result = resolvePaste({
    currentValue: "",
    selection: empty,
    sanitised: "1234",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "commit", value: "1234", cursor: 4 });
});

test("commits a valid decimal paste into an empty input", () => {
  const result = resolvePaste({
    currentValue: "",
    selection: empty,
    sanitised: "12.34",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "commit", value: "12.34", cursor: 5 });
});

test("commits a negative paste when negatives are allowed", () => {
  const result = resolvePaste({
    currentValue: "",
    selection: empty,
    sanitised: "-5",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "commit", value: "-5", cursor: 2 });
});

test("rejects a negative paste when negatives are not allowed", () => {
  const result = resolvePaste({
    currentValue: "",
    selection: empty,
    sanitised: "-5",
    allowNegative: false,
  });
  expect(result).toEqual({ type: "reject" });
});

test("rejects when sanitised text is empty", () => {
  const result = resolvePaste({
    currentValue: "",
    selection: empty,
    sanitised: "",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "reject" });
});

test("rejects when sanitised text contains an embedded minus", () => {
  const result = resolvePaste({
    currentValue: "",
    selection: empty,
    sanitised: "1-2",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "reject" });
});

test("rejects when splicing would produce duplicate decimal points", () => {
  const result = resolvePaste({
    currentValue: "1.5",
    selection: { start: 3, end: 3 },
    sanitised: "2.3",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "reject" });
});

test("rejects when splicing would produce an embedded minus", () => {
  const result = resolvePaste({
    currentValue: "-12",
    selection: { start: 3, end: 3 },
    sanitised: "-5",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "reject" });
});

test("commits when splicing into a populated field produces a valid value", () => {
  const result = resolvePaste({
    currentValue: "12",
    selection: { start: 2, end: 2 },
    sanitised: "34",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "commit", value: "1234", cursor: 4 });
});

test("commits when the selection replaces existing text", () => {
  const result = resolvePaste({
    currentValue: "100",
    selection: { start: 0, end: 3 },
    sanitised: "42",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "commit", value: "42", cursor: 2 });
});

// ---------------------------------------------------------------------------
// resolveKeystroke
// ---------------------------------------------------------------------------

const atStart: Selection = { start: 0, end: 0 };
const atEnd = (value: string): Selection => ({ start: value.length, end: value.length });

test("allows a digit", () => {
  const result = resolveKeystroke({
    currentValue: "",
    selection: atStart,
    data: "5",
    decimalSep: ".",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "allow" });
});

test("rejects a letter", () => {
  const result = resolveKeystroke({
    currentValue: "",
    selection: atStart,
    data: "a",
    decimalSep: ".",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "reject" });
});

test("rejects a special character", () => {
  const result = resolveKeystroke({
    currentValue: "",
    selection: atStart,
    data: "$",
    decimalSep: ".",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "reject" });
});

test('allows the decimal separator "." in an empty input', () => {
  const result = resolveKeystroke({
    currentValue: "",
    selection: atStart,
    data: ".",
    decimalSep: ".",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "allow" });
});

test('rejects a second "." when one is already present outside the selection', () => {
  const value = "1.5";
  const result = resolveKeystroke({
    currentValue: value,
    selection: atEnd(value),
    data: ".",
    decimalSep: ".",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "reject" });
});

test('allows "." when the existing decimal is within the selection (will be replaced)', () => {
  const result = resolveKeystroke({
    currentValue: "1.5",
    selection: { start: 0, end: 3 },
    data: ".",
    decimalSep: ".",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "allow" });
});

test('allows "-" at position 0 in an empty input when negatives are allowed', () => {
  const result = resolveKeystroke({
    currentValue: "",
    selection: atStart,
    data: "-",
    decimalSep: ".",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "allow" });
});

test('rejects "-" when negatives are not allowed', () => {
  const result = resolveKeystroke({
    currentValue: "",
    selection: atStart,
    data: "-",
    decimalSep: ".",
    allowNegative: false,
  });
  expect(result).toEqual({ type: "reject" });
});

test('rejects "-" when cursor is not at position 0', () => {
  const value = "123";
  const result = resolveKeystroke({
    currentValue: value,
    selection: atEnd(value),
    data: "-",
    decimalSep: ".",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "reject" });
});

test('rejects a second "-" when one is already at position 0 with cursor at start (not replacing it)', () => {
  const result = resolveKeystroke({
    currentValue: "-123",
    selection: { start: 0, end: 0 },
    data: "-",
    decimalSep: ".",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "reject" });
});

test('allows "-" at position 0 when the selection covers the existing "-"', () => {
  // Selection covers '-123', so the existing '-' is replaced
  const result = resolveKeystroke({
    currentValue: "-123",
    selection: { start: 0, end: 4 },
    data: "-",
    decimalSep: ".",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "allow" });
});

test('commits a locale decimal separator "," by inserting "."', () => {
  const result = resolveKeystroke({
    currentValue: "1",
    selection: { start: 1, end: 1 },
    data: ",",
    decimalSep: ",",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "commit", value: "1.", cursor: 2 });
});

test("commits locale decimal separator into an empty input", () => {
  const result = resolveKeystroke({
    currentValue: "",
    selection: atStart,
    data: ",",
    decimalSep: ",",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "commit", value: ".", cursor: 1 });
});

test('rejects locale decimal separator when "." is already present outside the selection', () => {
  const value = "1.5";
  const result = resolveKeystroke({
    currentValue: value,
    selection: atEnd(value),
    data: ",",
    decimalSep: ",",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "reject" });
});

test('allows locale decimal separator when the existing "." is within the selection', () => {
  const result = resolveKeystroke({
    currentValue: "1.5",
    selection: { start: 1, end: 2 },
    data: ",",
    decimalSep: ",",
    allowNegative: true,
  });
  expect(result).toEqual({ type: "commit", value: "1.5", cursor: 2 });
});

test('rejects "." when decimals are disallowed', () => {
  const result = resolveKeystroke({
    currentValue: "12",
    selection: atEnd("12"),
    data: ".",
    decimalSep: ".",
    allowNegative: true,
    maxFractionDigits: 0,
  });
  expect(result).toEqual({ type: "reject" });
});

test("rejects the locale decimal separator when decimals are disallowed", () => {
  const result = resolveKeystroke({
    currentValue: "12",
    selection: atEnd("12"),
    data: ",",
    decimalSep: ",",
    allowNegative: true,
    maxFractionDigits: 0,
  });
  expect(result).toEqual({ type: "reject" });
});

test("still allows digits when decimals are disallowed", () => {
  const result = resolveKeystroke({
    currentValue: "12",
    selection: atEnd("12"),
    data: "5",
    decimalSep: ".",
    allowNegative: true,
    maxFractionDigits: 0,
  });
  expect(result).toEqual({ type: "allow" });
});

test("rejects a digit that would push the fractional part past maxFractionDigits", () => {
  const result = resolveKeystroke({
    currentValue: "1.23",
    selection: atEnd("1.23"),
    data: "4",
    decimalSep: ".",
    allowNegative: true,
    maxFractionDigits: 2,
  });
  expect(result).toEqual({ type: "reject" });
});

test("allows a digit that lands exactly on maxFractionDigits", () => {
  const result = resolveKeystroke({
    currentValue: "1.2",
    selection: atEnd("1.2"),
    data: "3",
    decimalSep: ".",
    allowNegative: true,
    maxFractionDigits: 2,
  });
  expect(result).toEqual({ type: "allow" });
});

test("allows a digit before the decimal point regardless of maxFractionDigits", () => {
  const result = resolveKeystroke({
    currentValue: "1.23",
    selection: { start: 0, end: 0 },
    data: "9",
    decimalSep: ".",
    allowNegative: true,
    maxFractionDigits: 2,
  });
  expect(result).toEqual({ type: "allow" });
});

test("allows unlimited digits when maxFractionDigits is Infinity", () => {
  const result = resolveKeystroke({
    currentValue: "1.23456789",
    selection: atEnd("1.23456789"),
    data: "1",
    decimalSep: ".",
    allowNegative: true,
    maxFractionDigits: Infinity,
  });
  expect(result).toEqual({ type: "allow" });
});
