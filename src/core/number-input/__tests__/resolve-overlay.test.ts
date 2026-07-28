import { resolveOverlayValue } from "../resolve-overlay";
import type { ResolveOverlayValueParams } from "../resolve-overlay";

// en-GB resolves to a decimal default of minimumFractionDigits: 0, maximumFractionDigits: 3.
const enGB: ResolveOverlayValueParams = {
  locale: "en-GB",
  formatOptions: undefined,
  fractionBounds: { min: 0, max: 3 },
  scaleExponent: 0,
};

const withOptions = (
  formatOptions: Intl.NumberFormatOptions,
  fractionBounds = { min: 0, max: 3 },
  scaleExponent = 0,
): ResolveOverlayValueParams => ({
  locale: "en-GB",
  formatOptions,
  fractionBounds,
  scaleExponent,
});

// ---------------------------------------------------------------------------
// Partial states — returned unchanged (overlay hidden)
// ---------------------------------------------------------------------------

test("returns an empty string unchanged", () => {
  expect(resolveOverlayValue("", enGB)).toBe("");
});

test("returns a lone minus unchanged", () => {
  expect(resolveOverlayValue("-", enGB)).toBe("-");
});

test("returns a lone decimal point unchanged", () => {
  expect(resolveOverlayValue(".", enGB)).toBe(".");
});

test("returns a negative lone decimal point unchanged", () => {
  expect(resolveOverlayValue("-.", enGB)).toBe("-.");
});

// ---------------------------------------------------------------------------
// Non-canonical controlled values — returned unchanged (overlay hidden)
// ---------------------------------------------------------------------------

test("hides the overlay for exponent notation", () => {
  // Number('1e5') is 100000, but the value is "1e5"; the overlay must not show "100,000".
  expect(resolveOverlayValue("1e5", enGB)).toBe("1e5");
});

test("hides the overlay for a hex string", () => {
  expect(resolveOverlayValue("0x10", enGB)).toBe("0x10");
});

test("hides the overlay for a numeric-separator string", () => {
  expect(resolveOverlayValue("1_000", enGB)).toBe("1_000");
});

test("hides the overlay for Infinity", () => {
  expect(resolveOverlayValue("Infinity", enGB)).toBe("Infinity");
});

test("hides the overlay for a leading-plus string", () => {
  expect(resolveOverlayValue("+12", enGB)).toBe("+12");
});

test("hides the overlay for a whitespace-padded number", () => {
  expect(resolveOverlayValue("  12  ", enGB)).toBe("  12  ");
});

test("hides the overlay for multiple decimal points", () => {
  expect(resolveOverlayValue("1.2.3", enGB)).toBe("1.2.3");
});

// ---------------------------------------------------------------------------
// Basic formatting
// ---------------------------------------------------------------------------

test("formats an integer with group separators", () => {
  expect(resolveOverlayValue("1234567", enGB)).toBe("1,234,567");
});

test("formats a decimal with the locale decimal separator", () => {
  expect(resolveOverlayValue("1234.5", { ...enGB, locale: "de-DE" })).toBe("1.234,5");
});

test("formats a negative value", () => {
  expect(resolveOverlayValue("-1234.5", enGB)).toBe("-1,234.5");
});

test("preserves typed trailing zeros", () => {
  expect(resolveOverlayValue("1.50", enGB)).toBe("1.50");
});

test("formats a trailing decimal point as the integer it represents", () => {
  expect(resolveOverlayValue("1234.", enGB)).toBe("1,234");
});

// ---------------------------------------------------------------------------
// Precision — exact via the string overload (no rounding through Number)
// ---------------------------------------------------------------------------

test("formats an integer beyond Number.MAX_SAFE_INTEGER exactly via BigInt", () => {
  // Number('9007199254740993') rounds to 9007199254740992; BigInt keeps it exact.
  expect(resolveOverlayValue("9007199254740993", enGB)).toBe("9,007,199,254,740,993");
});

test("formats a large negative integer beyond Number.MAX_SAFE_INTEGER exactly", () => {
  expect(resolveOverlayValue("-9007199254740993", enGB)).toBe("-9,007,199,254,740,993");
});

test("formats a high-precision decimal exactly via the string overload", () => {
  // Number('9007199254740993.5') is 9007199254740994; the string overload keeps full precision.
  // (Requires an engine with the precision-preserving string overload; Node provides it.)
  expect(resolveOverlayValue("9007199254740993.5", enGB)).toBe("9,007,199,254,740,993.5");
});

test("formats a very long high-precision decimal without rounding", () => {
  const raw = "1.123456789012345678901234567890";
  expect(resolveOverlayValue(raw, enGB)).toBe("1.123456789012345678901234567890");
});

// ---------------------------------------------------------------------------
// Intl 100-digit ceiling
// ---------------------------------------------------------------------------

test("formats a value with exactly 100 fraction digits without throwing", () => {
  const raw = `0.${"1".repeat(100)}`;
  expect(resolveOverlayValue(raw, enGB)).toBe(`0.${"1".repeat(100)}`);
});

test("clamps display to 100 fraction digits for pathologically long values", () => {
  // 150 fraction digits would exceed Intl's limit; the overlay clamps to 100 rather than throwing.
  const raw = `0.${"1".repeat(150)}`;
  const result = resolveOverlayValue(raw, enGB);
  // 100 ones after the decimal point.
  expect(result).toBe(`0.${"1".repeat(100)}`);
});

// ---------------------------------------------------------------------------
// Consumer fraction-digit options — padding without rounding
// ---------------------------------------------------------------------------

test("pads to minimumFractionDigits", () => {
  expect(resolveOverlayValue("1.5", withOptions({ minimumFractionDigits: 2 }))).toBe("1.50");
});

test("does not round a value that exceeds maximumFractionDigits", () => {
  // maximumFractionDigits: 2 but the value has 3 digits — shown verbatim, not "2.00".
  expect(resolveOverlayValue("1.999", withOptions({ maximumFractionDigits: 2 }))).toBe("1.999");
});

test("clamps minimumFractionDigits to the actual digits when the value exceeds both bounds", () => {
  expect(
    resolveOverlayValue(
      "1.999",
      withOptions({ minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    ),
  ).toBe("1.999");
});

// ---------------------------------------------------------------------------
// Currency / percent styles
// ---------------------------------------------------------------------------

test("pads an integer to the currency minimum fraction digits", () => {
  const params = withOptions({ style: "currency", currency: "GBP" }, { min: 2, max: 2 });
  expect(resolveOverlayValue("5", params)).toBe("£5.00");
});

test("preserves a typed value beyond the currency default without rounding", () => {
  const params = withOptions({ style: "currency", currency: "GBP" }, { min: 2, max: 2 });
  expect(resolveOverlayValue("5.123", params)).toBe("£5.123");
});

// ---------------------------------------------------------------------------
// showNumberPartsOnly — descriptive affix parts omitted
// ---------------------------------------------------------------------------

test("showNumberPartsOnly strips the £ prefix symbol from a GBP overlay", () => {
  const params = withOptions({ style: "currency", currency: "GBP" }, { min: 2, max: 2 });
  expect(resolveOverlayValue("5", { ...params, showNumberPartsOnly: true })).toBe("5.00");
});

test("showNumberPartsOnly strips the € suffix symbol and trims the trailing space for de-DE EUR", () => {
  const params: ResolveOverlayValueParams = {
    locale: "de-DE",
    formatOptions: { style: "currency", currency: "EUR" },
    fractionBounds: { min: 2, max: 2 },
    scaleExponent: 0,
    showNumberPartsOnly: true,
  };
  expect(resolveOverlayValue("1234.5", params)).toBe("1.234,50");
});

test("showNumberPartsOnly preserves a typed value beyond the currency default without rounding", () => {
  const params = withOptions({ style: "currency", currency: "GBP" }, { min: 2, max: 2 });
  expect(resolveOverlayValue("5.123", { ...params, showNumberPartsOnly: true })).toBe("5.123");
});

test("showNumberPartsOnly strips the % suffix from a percent-style overlay", () => {
  const params: ResolveOverlayValueParams = {
    locale: "en-GB",
    formatOptions: { style: "percent" },
    fractionBounds: { min: 0, max: 0 },
    scaleExponent: 0,
    showNumberPartsOnly: true,
  };
  expect(resolveOverlayValue("1", params)).toBe("100");
});

test("showNumberPartsOnly=false (default) preserves the full formatted output with symbol", () => {
  const params = withOptions({ style: "currency", currency: "GBP" }, { min: 2, max: 2 });
  // Flag absent — output identical to current .format() behaviour.
  expect(resolveOverlayValue("5", params)).toBe("£5.00");
});

// ---------------------------------------------------------------------------
// scaleExponent: 2 (percent) — "never rounds" in display-space
// ---------------------------------------------------------------------------

test("percent: 0.255 → 25.5% (1 display fraction digit)", () => {
  const params = withOptions({ style: "percent" }, { min: 0, max: 0 }, 2);
  expect(resolveOverlayValue("0.255", { ...params, showNumberPartsOnly: true })).toBe("25.5");
});

test("percent: 0.5 with minimumFractionDigits: 2 → 50.00% (padded)", () => {
  const params = withOptions({ style: "percent", minimumFractionDigits: 2 }, { min: 2, max: 2 }, 2);
  expect(resolveOverlayValue("0.5", { ...params, showNumberPartsOnly: true })).toBe("50.00");
});

test("percent: 0.00005 → 0.005% (3 display fraction digits)", () => {
  const params = withOptions({ style: "percent" }, { min: 0, max: 0 }, 2);
  expect(resolveOverlayValue("0.00005", { ...params, showNumberPartsOnly: true })).toBe("0.005");
});

test("percent: 0.2555 with maximumFractionDigits: 2 is shown unrounded (2 display digits)", () => {
  // displayActualFractionDigits = max(0, 4 - 2) = 2; cap = max(2, 2) = 2 → no rounding.
  const params = withOptions({ style: "percent", maximumFractionDigits: 2 }, { min: 0, max: 2 }, 2);
  expect(resolveOverlayValue("0.2555", { ...params, showNumberPartsOnly: true })).toBe("25.55");
});

// ---------------------------------------------------------------------------
// unsupported options stripped — overlay never rounds via sig-digit or rounding options
// ---------------------------------------------------------------------------

// These tests verify resolveOverlayValue's behaviour when called with ALREADY-STRIPPED
// options, which is the only realistic call path (the component strips before calling).

test("with stripped options (no maximumSignificantDigits), the overlay shows 1234.5678 unrounded", () => {
  // Stripped { maximumSignificantDigits: 3 } → {}; plain decimal formatting applies.
  const params = withOptions({});
  expect(resolveOverlayValue("1234.5678", params)).toBe("1,234.5678");
});

test("with stripped options (no roundingMode), the overlay shows 1.555 unrounded", () => {
  // Stripped { minimumFractionDigits: 2, roundingMode: 'halfExpand' } → { minimumFractionDigits: 2 };
  // actualFractionDigits (3) raises resolvedMax to 3 so no rounding occurs.
  const params = withOptions({ minimumFractionDigits: 2 });
  expect(resolveOverlayValue("1.555", params)).toBe("1.555");
});
