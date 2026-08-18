import { render, screen } from "@testing-library/react";

import { CurrencyInput } from "../currency-input";

// ---------------------------------------------------------------------------
// Symbol and position — prefix currencies
// ---------------------------------------------------------------------------

test("renders £ as a prefix for GBP in en-GB", () => {
  render(<CurrencyInput aria-label="Amount" currency="GBP" locale="en-GB" />);
  expect(screen.getByText("£")).toBeVisible();
});

test("renders $ as a prefix for USD in en-US", () => {
  render(<CurrencyInput aria-label="Amount" currency="USD" locale="en-US" />);
  expect(screen.getByText("$")).toBeVisible();
});

test("renders ￥ as a prefix for JPY in ja-JP", () => {
  render(<CurrencyInput aria-label="Amount" currency="JPY" locale="ja-JP" />);
  expect(screen.getByText("￥")).toBeVisible();
});

// ---------------------------------------------------------------------------
// Symbol and position — suffix currencies
// ---------------------------------------------------------------------------

test("renders € as a suffix for EUR in de-DE", () => {
  render(<CurrencyInput aria-label="Amount" currency="EUR" locale="de-DE" />);
  expect(screen.getByText("€")).toBeVisible();
});

test('renders "kr" as a suffix for SEK in sv-SE', () => {
  render(<CurrencyInput aria-label="Amount" currency="SEK" locale="sv-SE" />);
  expect(screen.getByText("kr")).toBeVisible();
});

// ---------------------------------------------------------------------------
// currencyDisplay override
// ---------------------------------------------------------------------------

test('uses the currency code as the affix when currencyDisplay="code"', () => {
  render(
    <CurrencyInput aria-label="Amount" currency="GBP" locale="en-GB" currencyDisplay="code" />,
  );
  expect(screen.getByText("GBP")).toBeVisible();
});

// ---------------------------------------------------------------------------
// currencySign
// ---------------------------------------------------------------------------

test('formats a negative overlay using parentheses when currencySign="accounting"', () => {
  const { container } = render(
    <CurrencyInput
      aria-label="Amount"
      currency="GBP"
      locale="en-GB"
      currencySign="accounting"
      value="-5"
    />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  // Accounting style wraps the number in parentheses rather than prefixing with a minus sign.
  expect(overlay).toHaveTextContent("(5.00)");
  expect(overlay).not.toHaveTextContent("-");
});

// ---------------------------------------------------------------------------
// Fraction-digit caps delegated from currency
// ---------------------------------------------------------------------------

test('renders an input with inputMode="decimal" for GBP (2 decimal places)', () => {
  render(<CurrencyInput aria-label="Amount" currency="GBP" locale="en-GB" />);
  expect(screen.getByRole("textbox")).toHaveAttribute("inputMode", "decimal");
});

test('renders an input with inputMode="numeric" for JPY (0 decimal places)', () => {
  render(<CurrencyInput aria-label="Amount" currency="JPY" locale="ja-JP" />);
  expect(screen.getByRole("textbox")).toHaveAttribute("inputMode", "numeric");
});

// ---------------------------------------------------------------------------
// Overlay formatting
// ---------------------------------------------------------------------------

test("shows a symbol-free locale-formatted overlay for GBP in en-GB", () => {
  const { container } = render(
    <CurrencyInput aria-label="Amount" currency="GBP" locale="en-GB" value="1234.5" />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("1,234.50");
  expect(overlay).not.toHaveTextContent("£");
});

test("shows a symbol-free locale-formatted overlay for EUR in de-DE", () => {
  const { container } = render(
    <CurrencyInput aria-label="Amount" currency="EUR" locale="de-DE" value="1234.5" />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("1.234,50");
  expect(overlay).not.toHaveTextContent("€");
});

test("renders the currency symbol as an affix, not inside the overlay", () => {
  const { container } = render(
    <CurrencyInput aria-label="Amount" currency="GBP" locale="en-GB" value="1234.5" />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).not.toHaveTextContent("£");
  expect(screen.getByText("£")).toBeVisible();
});

// ---------------------------------------------------------------------------
// Prop forwarding
// ---------------------------------------------------------------------------

test("renders a text input", () => {
  render(<CurrencyInput aria-label="Amount" currency="GBP" />);
  expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
});

test("forwards size to the underlying input container", () => {
  const { container } = render(<CurrencyInput aria-label="Amount" currency="GBP" size="large" />);
  expect(container.firstElementChild).toHaveAttribute("data-size", "large");
});

test("forwards className to the underlying input container", () => {
  const { container } = render(
    <CurrencyInput aria-label="Amount" currency="GBP" className="custom" />,
  );
  expect(container.firstElementChild).toHaveClass("custom");
});

test("forwards a ref to the underlying input element", () => {
  const ref = { current: null };
  render(<CurrencyInput aria-label="Amount" currency="GBP" ref={ref} />);
  expect(ref.current).toBe(screen.getByRole("textbox"));
});

// ---------------------------------------------------------------------------
// Graceful degradation
// ---------------------------------------------------------------------------

test("does not throw for an invalid locale", () => {
  expect(() => {
    render(<CurrencyInput aria-label="Amount" currency="GBP" locale="not-a-valid-locale!!" />);
  }).not.toThrow();
});
