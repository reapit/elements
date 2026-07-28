import { render, screen } from "@testing-library/react";

import { CurrencyControl } from "../currency-control";

test('renders a text input with inputMode="decimal"', () => {
  render(<CurrencyControl label="Amount" currency="GBP" />);
  const input = screen.getByRole("textbox");
  expect(input).toHaveAttribute("type", "text");
  expect(input).toHaveAttribute("inputMode", "decimal");
});

test('renders a text input with inputMode="numeric" for a zero-decimal currency', () => {
  render(<CurrencyControl label="Amount" currency="JPY" locale="ja-JP" />);
  expect(screen.getByRole("textbox")).toHaveAttribute("inputMode", "numeric");
});

test("associates the label with the input", () => {
  render(<CurrencyControl label="Amount" currency="GBP" />);
  expect(screen.getByLabelText("Amount")).toBe(screen.getByRole("textbox"));
});

test("displays error text, when provided", () => {
  render(
    <CurrencyControl label="Amount" currency="GBP" helpText="Help text" errorText="Error text" />,
  );
  expect(screen.getByText("Error text")).toBeVisible();
});

test("is described by the error text via aria-errormessage, when provided", () => {
  render(
    <CurrencyControl label="Amount" currency="GBP" helpText="Help text" errorText="Error text" />,
  );
  expect(screen.getByRole("textbox")).toHaveAccessibleErrorMessage("Error text");
});

test("displays help text, when provided and no error is present", () => {
  render(<CurrencyControl label="Amount" currency="GBP" helpText="Help text" />);
  expect(screen.getByText("Help text")).toBeVisible();
});

test("is described by the help text, when provided and no error is present", () => {
  render(<CurrencyControl label="Amount" currency="GBP" helpText="Help text" />);
  const input = screen.getByRole("textbox");
  expect(input).toHaveAccessibleDescription("Help text");
  expect(input).not.toHaveAttribute("aria-errormessage");
  expect(input).not.toHaveAttribute("aria-invalid");
});

test("does not display help text when error text is present", () => {
  render(
    <CurrencyControl label="Amount" currency="GBP" helpText="Help text" errorText="Error text" />,
  );
  expect(screen.queryByText("Help text")).not.toBeInTheDocument();
});

test("forwards additional attributes to the input", () => {
  render(
    <CurrencyControl data-testid="test-id" label="Amount" currency="GBP" placeholder="0.00" />,
  );
  const input = screen.getByTestId("test-id");
  expect(input).toBe(screen.getByRole("textbox"));
  expect(input).toHaveAttribute("placeholder", "0.00");
});

test("applies the required attribute to the input", () => {
  render(<CurrencyControl label="Amount" currency="GBP" required />);
  expect(screen.getByRole("textbox")).toBeRequired();
});

test("uses provided id for the input", () => {
  render(<CurrencyControl id="custom-id" label="Amount" currency="GBP" />);
  expect(screen.getByRole("textbox")).toHaveAttribute("id", "custom-id");
});

test("generates an id when none is provided", () => {
  render(<CurrencyControl label="Amount" currency="GBP" />);
  expect(screen.getByRole("textbox").getAttribute("id")).toBeTruthy();
});

test("sets aria-invalid to true when error text is present", () => {
  render(<CurrencyControl label="Amount" currency="GBP" errorText="Error text" />);
  expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
});

test("does not set aria-invalid when error text is not present", () => {
  render(<CurrencyControl label="Amount" currency="GBP" />);
  expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
});

test('sets data-show-validity="true" on the input when error text is present', () => {
  render(<CurrencyControl label="Amount" currency="GBP" errorText="Error text" />);
  expect(screen.getByRole("textbox")).toHaveAttribute("data-show-validity", "true");
});

test('does not set data-show-validity="true" on the input when no error text is present', () => {
  render(<CurrencyControl label="Amount" currency="GBP" />);
  expect(screen.getByRole("textbox")).not.toHaveAttribute("data-show-validity", "true");
});

test("respects an explicit showValidity={false} override even when error text is present", () => {
  render(
    <CurrencyControl label="Amount" currency="GBP" errorText="Error text" showValidity={false} />,
  );
  expect(screen.getByRole("textbox")).toHaveAttribute("data-show-validity", "false");
});

test("forwards a ref to the underlying input element", () => {
  const ref = { current: null };
  render(<CurrencyControl label="Amount" currency="GBP" ref={ref} />);
  expect(ref.current).toBe(screen.getByRole("textbox"));
});

test("forwards CurrencyInput-specific props — currency symbol reaches the rendered input", () => {
  render(<CurrencyControl label="Amount" currency="GBP" locale="en-GB" />);
  expect(screen.getByText("£")).toBeVisible();
});

test("displays a symbol-free formatted overlay and renders the currency symbol as an affix", () => {
  const { container } = render(
    <CurrencyControl label="Amount" currency="GBP" locale="en-GB" value="1234.5" />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("1,234.50");
  expect(overlay).not.toHaveTextContent("£");
  expect(container.querySelector('[data-position="before"]')).toHaveTextContent("£");
});
