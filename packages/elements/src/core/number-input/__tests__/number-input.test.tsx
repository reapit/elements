import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";

import { NumberInput } from "../number-input";

test('renders a text input with inputMode="decimal"', () => {
  render(<NumberInput />);
  const input = screen.getByRole("textbox");
  expect(input).toBeVisible();
  expect(input).toHaveAttribute("type", "text");
  expect(input).toHaveAttribute("inputMode", "decimal");
});

test("displays formatted text in an overlay when a value is provided", () => {
  const { container } = render(<NumberInput value="1234567" locale="en-GB" />);
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("1,234,567");
});

test("formats with locale-specific separators", () => {
  const { container } = render(<NumberInput value="1234.5" locale="de-DE" />);
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("1.234,5");
});

test("respects formatOptions for decimal places", () => {
  const { container } = render(
    <NumberInput value="1.5" locale="en-GB" formatOptions={{ minimumFractionDigits: 2 }} />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("1.50");
});

test("forwards ref to the underlying input element", () => {
  const ref = createRef<HTMLInputElement>();
  render(<NumberInput ref={ref} value="42" />);
  expect(ref.current).toBeInstanceOf(HTMLInputElement);
  expect(ref.current?.value).toBe("42");
});

test("the input value is always the raw numeric string", () => {
  render(<NumberInput value="1234567" locale="en-GB" />);
  expect(screen.getByRole("textbox")).toHaveValue("1234567");
});

test("forwards TextInput props", () => {
  const { container } = render(<NumberInput size="large" prefix="$" className="custom" />);
  expect(container.firstElementChild).toHaveAttribute("data-size", "large");
  expect(container.firstElementChild).toHaveClass("custom");
  expect(screen.getByText("$")).toBeVisible();
});

test("works as an uncontrolled input with defaultValue", () => {
  const { container } = render(<NumberInput defaultValue="9876" locale="en-GB" />);
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("9,876");
  expect(screen.getByRole("textbox")).toHaveValue("9876");
});

test("rejects non-numeric characters via beforeinput", () => {
  render(<NumberInput />);
  const input = screen.getByRole("textbox");
  const event = new InputEvent("beforeinput", { data: "abc", cancelable: true });
  const prevented = !input.dispatchEvent(event);
  expect(prevented).toBe(true);
});

test("allows digits via beforeinput", () => {
  render(<NumberInput />);
  const input = screen.getByRole("textbox");
  const event = new InputEvent("beforeinput", { data: "5", cancelable: true });
  const prevented = !input.dispatchEvent(event);
  expect(prevented).toBe(false);
});

test("sanitises multi-character insertText the same way as paste", () => {
  render(<NumberInput />);
  const input = screen.getByRole("textbox");
  const event = new InputEvent("beforeinput", {
    data: "123",
    cancelable: true,
    inputType: "insertText",
  });
  input.dispatchEvent(event);
  expect(input).toHaveValue("123");
});

test("allows the locale decimal separator via beforeinput", () => {
  render(<NumberInput locale="en-GB" />);
  const input = screen.getByRole("textbox");
  const event = new InputEvent("beforeinput", { data: ".", cancelable: true });
  const prevented = !input.dispatchEvent(event);
  expect(prevented).toBe(false);
});

test("allows minus sign when min is not set", () => {
  render(<NumberInput />);
  const input = screen.getByRole("textbox");
  const event = new InputEvent("beforeinput", { data: "-", cancelable: true });
  const prevented = !input.dispatchEvent(event);
  expect(prevented).toBe(false);
});

test("allows minus sign when min is negative", () => {
  render(<NumberInput min={-100} />);
  const input = screen.getByRole("textbox");
  const event = new InputEvent("beforeinput", { data: "-", cancelable: true });
  const prevented = !input.dispatchEvent(event);
  expect(prevented).toBe(false);
});

test("rejects minus sign when min is 0", () => {
  render(<NumberInput min={0} />);
  const input = screen.getByRole("textbox");
  const event = new InputEvent("beforeinput", { data: "-", cancelable: true });
  const prevented = !input.dispatchEvent(event);
  expect(prevented).toBe(true);
});

test("rejects minus sign when min is a positive number", () => {
  render(<NumberInput min={1} />);
  const input = screen.getByRole("textbox");
  const event = new InputEvent("beforeinput", { data: "-", cancelable: true });
  const prevented = !input.dispatchEvent(event);
  expect(prevented).toBe(true);
});

test("allows minus sign when min is a non-numeric string", () => {
  render(<NumberInput min="abc" />);
  const input = screen.getByRole("textbox");
  const event = new InputEvent("beforeinput", { data: "-", cancelable: true });
  const prevented = !input.dispatchEvent(event);
  expect(prevented).toBe(false);
});

test("sanitises pasted content by stripping group separators", () => {
  render(<NumberInput locale="en-GB" />);
  const input = screen.getByRole<HTMLInputElement>("textbox");

  const event = new InputEvent("beforeinput", {
    data: "1,234.56",
    inputType: "insertFromPaste",
    cancelable: true,
  });
  input.dispatchEvent(event);

  expect(input.value).toBe("1234.56");
});

test("sanitises dropped content the same way as pasted content", () => {
  render(<NumberInput locale="en-GB" />);
  const input = screen.getByRole<HTMLInputElement>("textbox");

  const event = new InputEvent("beforeinput", {
    data: "1,234.56",
    inputType: "insertFromDrop",
    cancelable: true,
  });
  input.dispatchEvent(event);

  expect(input.value).toBe("1234.56");
});

test("truncates multiple decimal points in pasted content at the second separator", () => {
  render(<NumberInput locale="en-GB" />);
  const input = screen.getByRole<HTMLInputElement>("textbox");

  const event = new InputEvent("beforeinput", {
    data: "1.2.3",
    inputType: "insertFromPaste",
    cancelable: true,
  });
  input.dispatchEvent(event);

  expect(input.value).toBe("1.2");
});

test('normalises the locale decimal separator to "." during keystroke input', () => {
  render(<NumberInput locale="de-DE" />);
  const input = screen.getByRole<HTMLInputElement>("textbox");
  const event = new InputEvent("beforeinput", { data: ",", cancelable: true });
  input.dispatchEvent(event);
  expect(input.value).toBe(".");
});

test("blocks the locale decimal separator when a decimal point is already present", () => {
  render(<NumberInput locale="de-DE" />);
  const input = screen.getByRole<HTMLInputElement>("textbox");
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, "1.5");
  const event = new InputEvent("beforeinput", { data: ",", cancelable: true });
  const prevented = !input.dispatchEvent(event);
  expect(prevented).toBe(true);
  expect(input.value).toBe("1.5");
});

test("rejects minus sign when not at the start of the input", () => {
  render(<NumberInput defaultValue="123" />);
  const input = screen.getByRole<HTMLInputElement>("textbox");
  input.setSelectionRange(3, 3);
  const event = new InputEvent("beforeinput", { data: "-", cancelable: true });
  const prevented = !input.dispatchEvent(event);
  expect(prevented).toBe(true);
});

test("is valid when the controlled value is within range", () => {
  render(<NumberInput value="5" min={0} max={10} />);
  expect(screen.getByRole("textbox")).toBeValid();
});

test("is invalid when the controlled value is below min", () => {
  render(<NumberInput value="-1" min={0} />);
  const input = screen.getByRole<HTMLInputElement>("textbox");
  expect(input).toBeInvalid();
  expect(input.validationMessage).toBe("rangeUnderflow");
});

test("is invalid when the controlled value is above max", () => {
  render(<NumberInput value="11" max={10} />);
  const input = screen.getByRole<HTMLInputElement>("textbox");
  expect(input).toBeInvalid();
  expect(input.validationMessage).toBe("rangeOverflow");
});

test("becomes valid when the controlled value moves back into range", () => {
  const { rerender } = render(<NumberInput value="11" max={10} />);
  expect(screen.getByRole("textbox")).toBeInvalid();
  rerender(<NumberInput value="5" max={10} />);
  expect(screen.getByRole("textbox")).toBeValid();
});

test("does not mark an empty controlled value as invalid", () => {
  render(<NumberInput value="" min={0} max={10} />);
  expect(screen.getByRole("textbox")).toBeValid();
});

test('marks a controlled value of "." as invalid with "badInput"', () => {
  render(<NumberInput value="." />);
  const input = screen.getByRole<HTMLInputElement>("textbox");
  expect(input).toBeInvalid();
  expect(input.validationMessage).toBe("badInput");
});

test('marks a controlled value of "-." as invalid with "badInput"', () => {
  render(<NumberInput value="-." />);
  const input = screen.getByRole<HTMLInputElement>("textbox");
  expect(input).toBeInvalid();
  expect(input.validationMessage).toBe("badInput");
});

test("is invalid when an uncontrolled input receives a value below min", () => {
  render(<NumberInput min={0} />);
  const input = screen.getByRole("textbox");
  fireEvent.input(input, { target: { value: "-5" } });
  expect(input).toBeInvalid();
});

test("is invalid when an uncontrolled input receives a value above max", () => {
  render(<NumberInput max={10} />);
  const input = screen.getByRole("textbox");
  fireEvent.input(input, { target: { value: "15" } });
  expect(input).toBeInvalid();
});

test("fires onChange when pasting content", () => {
  const onChange = vi.fn();
  render(<NumberInput locale="en-GB" onChange={onChange} />);
  const input = screen.getByRole<HTMLInputElement>("textbox");

  const event = new InputEvent("beforeinput", {
    data: "1,234.56",
    inputType: "insertFromPaste",
    cancelable: true,
  });
  input.dispatchEvent(event);

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(input.value).toBe("1234.56");
});

test("fires onChange when normalising a locale decimal separator", () => {
  const onChange = vi.fn();
  render(<NumberInput locale="de-DE" onChange={onChange} />);
  const input = screen.getByRole<HTMLInputElement>("textbox");

  const event = new InputEvent("beforeinput", { data: ",", cancelable: true });
  input.dispatchEvent(event);

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(input.value).toBe(".");
});

test("fires onChange with the pasted value for a controlled input", () => {
  const onChange = vi.fn();
  const { rerender } = render(<NumberInput locale="en-GB" value="" onChange={onChange} />);
  const input = screen.getByRole<HTMLInputElement>("textbox");

  const event = new InputEvent("beforeinput", {
    data: "1,234",
    inputType: "insertFromPaste",
    cancelable: true,
  });
  input.dispatchEvent(event);

  expect(onChange).toHaveBeenCalledTimes(1);

  // Simulate the parent updating state in response to onChange
  rerender(<NumberInput locale="en-GB" value="1234" onChange={onChange} />);
  expect(input).toHaveValue("1234");
});

test("rejects paste that would produce an embedded minus in a populated field", () => {
  render(<NumberInput defaultValue="-12" />);
  const input = screen.getByRole<HTMLInputElement>("textbox");
  input.setSelectionRange(3, 3);

  const event = new InputEvent("beforeinput", {
    data: "-5",
    inputType: "insertFromPaste",
    cancelable: true,
  });
  input.dispatchEvent(event);

  expect(input.value).toBe("-12");
});

test("rejects paste that would produce duplicate decimal points in a populated field", () => {
  render(<NumberInput defaultValue="1.5" />);
  const input = screen.getByRole<HTMLInputElement>("textbox");
  input.setSelectionRange(3, 3);

  const event = new InputEvent("beforeinput", {
    data: "2.3",
    inputType: "insertFromPaste",
    cancelable: true,
  });
  input.dispatchEvent(event);

  expect(input.value).toBe("1.5");
});

test("accepts paste that produces a valid value in a populated field", () => {
  render(<NumberInput defaultValue="12" />);
  const input = screen.getByRole<HTMLInputElement>("textbox");
  input.setSelectionRange(2, 2);

  const event = new InputEvent("beforeinput", {
    data: "34",
    inputType: "insertFromPaste",
    cancelable: true,
  });
  input.dispatchEvent(event);

  expect(input.value).toBe("1234");
});

test("does not forward min and max as DOM attributes", () => {
  render(<NumberInput min={0} max={100} />);
  const input = screen.getByRole("textbox");
  expect(input).not.toHaveAttribute("min");
  expect(input).not.toHaveAttribute("max");
});

test("allows the locale decimal separator when the existing decimal is within the selection", () => {
  render(<NumberInput locale="de-DE" />);
  const input = screen.getByRole<HTMLInputElement>("textbox");
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, "1.5");
  // Select all text: the existing '.' is inside the selection
  input.setSelectionRange(0, 3);
  const event = new InputEvent("beforeinput", { data: ",", cancelable: true });
  input.dispatchEvent(event);
  expect(input.value).toBe(".");
});

test("allows the locale decimal separator when only the decimal point is selected", () => {
  render(<NumberInput locale="de-DE" />);
  const input = screen.getByRole<HTMLInputElement>("textbox");
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, "1.5");
  // Select just the '.'
  input.setSelectionRange(1, 2);
  const event = new InputEvent("beforeinput", { data: ",", cancelable: true });
  input.dispatchEvent(event);
  expect(input.value).toBe("1.5");
});

test('blocks "." when the existing decimal point is outside the selection', () => {
  render(<NumberInput locale="en-GB" />);
  const input = screen.getByRole<HTMLInputElement>("textbox");
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, "1.5");
  // Cursor at the end: existing '.' is NOT in the selection
  input.setSelectionRange(3, 3);
  const event = new InputEvent("beforeinput", { data: ".", cancelable: true });
  const prevented = !input.dispatchEvent(event);
  expect(prevented).toBe(true);
  expect(input.value).toBe("1.5");
});

test('allows "." when the existing decimal point is inside the selection', () => {
  render(<NumberInput locale="en-GB" />);
  const input = screen.getByRole<HTMLInputElement>("textbox");
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, "1.5");
  // Select all text: the existing '.' is inside the selection
  input.setSelectionRange(0, 3);
  const event = new InputEvent("beforeinput", { data: ".", cancelable: true });
  const prevented = !input.dispatchEvent(event);
  expect(prevented).toBe(false);
});

test("sanitises insertReplacementText the same way as paste", () => {
  render(<NumberInput locale="en-GB" />);
  const input = screen.getByRole<HTMLInputElement>("textbox");

  const event = new InputEvent("beforeinput", {
    data: "1,234.56",
    inputType: "insertReplacementText",
    cancelable: true,
  });
  input.dispatchEvent(event);

  expect(input.value).toBe("1234.56");
});

test("overlay preserves full decimal precision when no formatOptions are set", () => {
  const { container } = render(<NumberInput value="1.23456789" locale="en-GB" />);
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("1.23456789");
});

test("overlay preserves typed trailing zeros when no formatOptions are set", () => {
  const { container } = render(<NumberInput value="1.50" locale="en-GB" />);
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("1.50");
});

test("overlay applies grouping to integers without adding spurious decimal places", () => {
  const { container } = render(<NumberInput value="1234567" locale="en-GB" />);
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("1,234,567");
});

test("consumer formatOptions fraction digits take precedence over derived precision", () => {
  // minimumFractionDigits: 2 pads "1.5" → "1.50"; the raw value is shown verbatim
  // (no rounding). A maximumFractionDigits: 2 cap prevents typing beyond 2 digits
  // but does not round a controlled value that exceeds it.
  const { container } = render(
    <NumberInput value="1.5" locale="en-GB" formatOptions={{ minimumFractionDigits: 2 }} />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("1.50");
});

// ---------------------------------------------------------------------------
// currency and percent formatting
// ---------------------------------------------------------------------------

test("pads an integer to the currency minimum fraction digits in the overlay", () => {
  const { container } = render(
    <NumberInput value="5" locale="en-GB" formatOptions={{ style: "currency", currency: "GBP" }} />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  // Symbol is rendered as a prefix affix, not inside the overlay
  expect(overlay).toHaveTextContent("5.00");
  expect(overlay).not.toHaveTextContent("£");
  expect(screen.getByText("£")).toBeVisible();
});

test("preserves typed high-precision value beyond the currency default in the overlay", () => {
  const { container } = render(
    <NumberInput
      value="5.123"
      locale="en-GB"
      formatOptions={{ style: "currency", currency: "GBP" }}
    />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  // Symbol is rendered as a prefix affix, not inside the overlay
  expect(overlay).toHaveTextContent("5.123");
  expect(overlay).not.toHaveTextContent("£");
});

test("blocks entry of a third decimal digit in currency mode", () => {
  render(<NumberInput locale="en-GB" formatOptions={{ style: "currency", currency: "GBP" }} />);
  const input = screen.getByRole<HTMLInputElement>("textbox");
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, "1.23");
  input.setSelectionRange(4, 4);
  const event = new InputEvent("beforeinput", { data: "4", cancelable: true });
  const prevented = !input.dispatchEvent(event);
  expect(prevented).toBe(true);
  expect(input.value).toBe("1.23");
});

test("allows entry up to the currency maximum fraction digits", () => {
  render(<NumberInput locale="en-GB" formatOptions={{ style: "currency", currency: "GBP" }} />);
  const input = screen.getByRole<HTMLInputElement>("textbox");
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, "1.2");
  input.setSelectionRange(3, 3);
  const event = new InputEvent("beforeinput", { data: "3", cancelable: true });
  const prevented = !input.dispatchEvent(event);
  expect(prevented).toBe(false);
});

test("truncates a paste that exceeds the currency precision cap", () => {
  render(<NumberInput locale="en-GB" formatOptions={{ style: "currency", currency: "GBP" }} />);
  const input = screen.getByRole<HTMLInputElement>("textbox");
  const event = new InputEvent("beforeinput", {
    data: "1.23456",
    inputType: "insertFromPaste",
    cancelable: true,
  });
  input.dispatchEvent(event);
  expect(input.value).toBe("1.23");
});

test("applies a bounded pattern when maximumFractionDigits is set", () => {
  render(<NumberInput formatOptions={{ maximumFractionDigits: 2 }} />);
  expect(screen.getByRole("textbox")).toHaveAttribute("pattern", "-?\\d*(\\.\\d{0,2})?");
});

test("applies a bounded pattern for currency style", () => {
  render(<NumberInput locale="en-GB" formatOptions={{ style: "currency", currency: "GBP" }} />);
  expect(screen.getByRole("textbox")).toHaveAttribute("pattern", "-?\\d*(\\.\\d{0,2})?");
});

test("flags an over-cap controlled value as invalid and shows it verbatim", () => {
  const { container } = render(
    <NumberInput
      value="1.999"
      locale="en-GB"
      formatOptions={{ style: "currency", currency: "GBP" }}
    />,
  );
  expect(screen.getByRole("textbox")).toHaveValue("1.999");
  const overlay = container.querySelector("[data-formatted-overlay]");
  // Symbol is rendered as a prefix affix, not inside the overlay
  expect(overlay).toHaveTextContent("1.999");
  expect(overlay).not.toHaveTextContent("£");
  expect(screen.getByRole("textbox")).toBeInvalid();
});

test("overlay does not round a controlled value that exceeds an explicit maximumFractionDigits", () => {
  // maximumFractionDigits: 2, but controlled value has 3 decimal digits.
  // The overlay must show "1.999", not "2.00" (which is what Intl.NumberFormat
  // would produce if maximumFractionDigits were passed through unchanged).
  const { container } = render(
    <NumberInput value="1.999" locale="en-GB" formatOptions={{ maximumFractionDigits: 2 }} />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("1.999");
});

test("minimumFractionDigits still pads when the value has fewer digits than the minimum", () => {
  // minimumFractionDigits: 2 should still pad "1.5" → "1.50".
  const { container } = render(
    <NumberInput value="1.5" locale="en-GB" formatOptions={{ minimumFractionDigits: 2 }} />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("1.50");
});

test("minimumFractionDigits is clamped to actualFractionDigits when value exceeds both constraints", () => {
  // minimumFractionDigits: 2, maximumFractionDigits: 2, but value has 3 digits.
  // resolvedMax = 3 (actualFractionDigits wins), resolvedMin = min(3, 3) = 3.
  // Overlay must show "1.999", not "2.00".
  const { container } = render(
    <NumberInput
      value="1.999"
      locale="en-GB"
      formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("1.999");
});

// ---------------------------------------------------------------------------
// trailing decimal point in the overlay
// ---------------------------------------------------------------------------

test("overlay formats a trailing decimal point as if the dot were absent", () => {
  // "1234." is numerically equal to "1234"; Intl.NumberFormat formats the
  // number value, so the overlay shows the locale-formatted integer. The
  // trailing dot is an in-progress entry character, not a distinct value.
  const { container } = render(<NumberInput value="1234." locale="en-GB" />);
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("1,234");
});

test("overlay formats a trailing decimal point on a negative value as if the dot were absent", () => {
  const { container } = render(<NumberInput value="-1234." locale="en-GB" />);
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("-1,234");
});

test("overlay pads a trailing-dot value when minimumFractionDigits is set", () => {
  // "12." is numerically 12. With minimumFractionDigits: 2 the overlay should
  // show "12.00"; the same value, just padded: not the raw "12.".
  const { container } = render(
    <NumberInput value="12." locale="en-GB" formatOptions={{ minimumFractionDigits: 2 }} />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("12.00");
});

test("does not cap entry for a bare NumberInput with no precision intent", () => {
  render(<NumberInput />);
  const input = screen.getByRole<HTMLInputElement>("textbox");
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(
    input,
    "1.23456789",
  );
  input.setSelectionRange(10, 10);
  const event = new InputEvent("beforeinput", { data: "1", cancelable: true });
  const prevented = !input.dispatchEvent(event);
  expect(prevented).toBe(false);
});

// ---------------------------------------------------------------------------
// inputMode and integer-only entry
// ---------------------------------------------------------------------------

test('defaults to inputMode="decimal" when no formatOptions are set', () => {
  render(<NumberInput />);
  expect(screen.getByRole("textbox")).toHaveAttribute("inputMode", "decimal");
});

test('renders inputMode="numeric" when set explicitly', () => {
  render(<NumberInput inputMode="numeric" />);
  expect(screen.getByRole("textbox")).toHaveAttribute("inputMode", "numeric");
});

test('infers inputMode="numeric" from maximumFractionDigits of 0', () => {
  render(<NumberInput formatOptions={{ maximumFractionDigits: 0 }} />);
  expect(screen.getByRole("textbox")).toHaveAttribute("inputMode", "numeric");
});

test("an explicit inputMode overrides the value inferred from formatOptions", () => {
  render(<NumberInput inputMode="decimal" formatOptions={{ maximumFractionDigits: 0 }} />);
  expect(screen.getByRole("textbox")).toHaveAttribute("inputMode", "decimal");
});

test("rejects the decimal separator on keystroke in numeric mode", () => {
  render(<NumberInput inputMode="numeric" />);
  const input = screen.getByRole("textbox");
  const event = new InputEvent("beforeinput", { data: ".", cancelable: true });
  const prevented = !input.dispatchEvent(event);
  expect(prevented).toBe(true);
});

test("still allows digits on keystroke in numeric mode", () => {
  render(<NumberInput inputMode="numeric" />);
  const input = screen.getByRole("textbox");
  const event = new InputEvent("beforeinput", { data: "5", cancelable: true });
  const prevented = !input.dispatchEvent(event);
  expect(prevented).toBe(false);
});

test("truncates a pasted decimal to its integer part in numeric mode", () => {
  render(<NumberInput inputMode="numeric" locale="en-GB" />);
  const input = screen.getByRole<HTMLInputElement>("textbox");

  const event = new InputEvent("beforeinput", {
    data: "12.99",
    inputType: "insertFromPaste",
    cancelable: true,
  });
  input.dispatchEvent(event);

  expect(input.value).toBe("12");
});

// ---------------------------------------------------------------------------
// pattern backstop
// ---------------------------------------------------------------------------

test("applies a default decimal pattern", () => {
  render(<NumberInput />);
  expect(screen.getByRole("textbox")).toHaveAttribute("pattern", "-?\\d*\\.?\\d*");
});

test("applies a default integer pattern in numeric mode", () => {
  render(<NumberInput inputMode="numeric" />);
  expect(screen.getByRole("textbox")).toHaveAttribute("pattern", "-?\\d*");
});

test("a consumer-supplied pattern takes precedence over the default", () => {
  render(<NumberInput pattern="\d{4}" />);
  expect(screen.getByRole("textbox")).toHaveAttribute("pattern", "\\d{4}");
});

test("flags a controlled decimal value as invalid in numeric mode via the pattern backstop", () => {
  render(<NumberInput inputMode="numeric" value="1.5" />);
  expect(screen.getByRole("textbox")).toBeInvalid();
});

// ---------------------------------------------------------------------------
// value contract
// ---------------------------------------------------------------------------

test('normalises a locale decimal separator to "." in the value, not the overlay separator', () => {
  render(<NumberInput locale="de-DE" />);
  const input = screen.getByRole<HTMLInputElement>("textbox");
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, "1");
  input.setSelectionRange(1, 1);
  input.dispatchEvent(new InputEvent("beforeinput", { data: ",", cancelable: true }));
  expect(input.value).toBe("1.");
});

test("keeps the value parseable by Number() after a grouped paste", () => {
  render(<NumberInput locale="de-DE" />);
  const input = screen.getByRole<HTMLInputElement>("textbox");

  const event = new InputEvent("beforeinput", {
    data: "1.234,56",
    inputType: "insertFromPaste",
    cancelable: true,
  });
  input.dispatchEvent(event);

  expect(input.value).toBe("1234.56");
  expect(Number.isNaN(Number(input.value))).toBe(false);
});

// ---------------------------------------------------------------------------
// invalid formatOptions: graceful degradation
// ---------------------------------------------------------------------------

test("renders without throwing when maximumFractionDigits is out of range", () => {
  expect(() =>
    render(<NumberInput value="1.5" formatOptions={{ maximumFractionDigits: 200 }} />),
  ).not.toThrow();
});

test("renders without throwing when minimumFractionDigits exceeds maximumFractionDigits", () => {
  expect(() =>
    render(
      <NumberInput
        value="1.5"
        formatOptions={{ minimumFractionDigits: 5, maximumFractionDigits: 2 }}
      />,
    ),
  ).not.toThrow();
});

test("treats a negative maximumFractionDigits as no cap, not a SyntaxError in the regex", () => {
  // A negative value is invalid for Intl.NumberFormat; deriveMaxFractionDigits must
  // reject it and fall back to Infinity rather than letting -1 flow into \d{0,-1}.
  expect(() => render(<NumberInput formatOptions={{ maximumFractionDigits: -1 }} />)).not.toThrow();
  expect(screen.getByRole("textbox")).toHaveAttribute("pattern", "-?\\d*\\.?\\d*");
});

test("coerces a non-integer maximumFractionDigits to its integer part", () => {
  // 2.5 → truncated to 2; the pattern should reflect a cap of 2.
  render(<NumberInput formatOptions={{ maximumFractionDigits: 2.5 }} />);
  expect(screen.getByRole("textbox")).toHaveAttribute("pattern", "-?\\d*(\\.\\d{0,2})?");
});

// ---------------------------------------------------------------------------
// overlay precision: integers beyond Number.MAX_SAFE_INTEGER
// ---------------------------------------------------------------------------

test("overlay formats an integer beyond Number.MAX_SAFE_INTEGER exactly, without rounding", () => {
  // 9007199254740993 is Number.MAX_SAFE_INTEGER + 2.
  // Number('9007199254740993') === 9007199254740992 (rounds to nearest even),
  // so formatting via Number would display something; one less.
  const { container } = render(<NumberInput value="9007199254740993" locale="en-GB" />);
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("9,007,199,254,740,993");
});

test("overlay formats a large negative integer beyond Number.MAX_SAFE_INTEGER exactly", () => {
  const { container } = render(<NumberInput value="-9007199254740993" locale="en-GB" />);
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("-9,007,199,254,740,993");
});

test("overlay formats a high-precision decimal exactly, without rounding through Number", () => {
  // Number('9007199254740993.5') === 9007199254740994; the string overload preserves precision.
  const { container } = render(<NumberInput value="9007199254740993.5" locale="en-GB" />);
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("9,007,199,254,740,993.5");
});

// ---------------------------------------------------------------------------
// auto-affix derivation from formatOptions.style
// ---------------------------------------------------------------------------

test("auto-wires currency symbol as a prefix for a prefix-position locale", () => {
  render(<NumberInput locale="en-GB" formatOptions={{ style: "currency", currency: "GBP" }} />);
  expect(screen.getByText("£")).toBeVisible();
});

test("auto-wires currency symbol as a suffix for a suffix-position locale", () => {
  render(<NumberInput locale="de-DE" formatOptions={{ style: "currency", currency: "EUR" }} />);
  expect(screen.getByText("€")).toBeVisible();
});

test("overlay does not contain the currency symbol when auto-affix is active", () => {
  const { container } = render(
    <NumberInput
      value="1234.5"
      locale="en-GB"
      formatOptions={{ style: "currency", currency: "GBP" }}
    />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).not.toHaveTextContent("£");
  expect(overlay).toHaveTextContent("1,234.50");
});

test("auto-wires percent sign as a suffix", () => {
  render(<NumberInput locale="en-GB" formatOptions={{ style: "percent" }} />);
  expect(screen.getByText("%")).toBeVisible();
});

test("overlay does not contain the percent sign when auto-affix is active", () => {
  const { container } = render(
    <NumberInput value="0.5" locale="en-GB" formatOptions={{ style: "percent" }} />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).not.toHaveTextContent("%");
});

test("auto-wires unit affix for style: unit", () => {
  render(<NumberInput locale="en-GB" formatOptions={{ style: "unit", unit: "kilogram" }} />);
  // 'kg' appears either as a prefix or suffix depending on locale
  expect(screen.getByText("kg")).toBeVisible();
});

test("overlay does not contain the unit when auto-affix is active", () => {
  const { container } = render(
    <NumberInput value="10" locale="en-GB" formatOptions={{ style: "unit", unit: "kilogram" }} />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).not.toHaveTextContent("kg");
  expect(overlay).toHaveTextContent("10");
});

test("no affix is rendered when formatOptions has no style", () => {
  const { container } = render(
    <NumberInput value="1234.5" locale="en-GB" formatOptions={{ useGrouping: true }} />,
  );
  // No affix container should be present; TextInput renders affixes as
  // a span with data-position="before"/"after". No icons are rendered here, so these
  // selectors uniquely identify an affix.
  expect(container.querySelector('[data-position="before"]')).toBeNull();
  expect(container.querySelector('[data-position="after"]')).toBeNull();
  // The number is still formatted in full.
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("1,234.5");
});

// ---------------------------------------------------------------------------
// explicit affix wins over style-derived affix
// ---------------------------------------------------------------------------

test("renders an arbitrary suffix that is not tied to a formatting style", () => {
  render(<NumberInput suffix="/month" />);
  expect(screen.getByText("/month")).toBeVisible();
});

test("an explicit prefix takes precedence over the style-derived currency symbol", () => {
  render(
    <NumberInput
      locale="en-GB"
      formatOptions={{ style: "currency", currency: "GBP" }}
      prefix="USD"
    />,
  );
  // The consumer prefix is shown; the derived '£' is not.
  expect(screen.getByText("USD")).toBeVisible();
  expect(screen.queryByText("£")).toBeNull();
});

test("an explicit suffix suppresses derivation even when the derived affix is a prefix", () => {
  // GBP would derive a '£' prefix; supplying any affix prop disables derivation entirely.
  const { container } = render(
    <NumberInput
      locale="en-GB"
      formatOptions={{ style: "currency", currency: "GBP" }}
      suffix="net"
    />,
  );
  expect(screen.getByText("net")).toBeVisible();
  expect(screen.queryByText("£")).toBeNull();
  // No prefix container was added.
  expect(container.querySelector('[data-position="before"]')).toBeNull();
});

test("the overlay keeps the currency symbol when an explicit affix overrides derivation", () => {
  // Because the consumer supplied an affix, the overlay is formatted in full (symbol included);
  // stripping only happens for the affix we derive ourselves.
  const { container } = render(
    <NumberInput
      value="1234.5"
      locale="en-GB"
      formatOptions={{ style: "currency", currency: "GBP" }}
      prefix="USD"
    />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("£1,234.50");
});

test("a leadingIcon suppresses the derived currency affix", () => {
  render(
    <NumberInput
      locale="en-GB"
      formatOptions={{ style: "currency", currency: "GBP" }}
      leadingIcon={<svg data-testid="icon" />}
    />,
  );
  expect(screen.getByTestId("icon")).toBeVisible();
  expect(screen.queryByText("£")).toBeNull();
});

// ---------------------------------------------------------------------------
// non-canonical controlled values: overlay never diverges, flagged invalid
// ---------------------------------------------------------------------------

test.each([
  ["exponent notation", "1e5"],
  ["a hex string", "0x10"],
  ["Infinity", "Infinity"],
  ["a numeric-separator string", "1_000"],
])("does not show a divergent overlay and flags %s as invalid", (_label, value) => {
  const { container } = render(<NumberInput value={value} locale="en-GB" />);
  // The raw value is shown verbatim in the input...
  expect(screen.getByRole("textbox")).toHaveValue(value);
  // ...the overlay never shows a *different* number than the value: formatValue returns the raw
  // string unchanged, so the overlay (which sits transparently over the input) is visually inert.
  // In particular it must never reinterpret the value (e.g. "1e5" → "100,000").
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent(value);
  // ...and the pattern backstop flags it as invalid.
  expect(screen.getByRole("textbox")).toBeInvalid();
});

test("does not throw when a controlled value would overflow BigInt parsing via exponent", () => {
  // "1e21" is non-canonical (rejected by the gate before any BigInt() call), so rendering it
  // must not throw across renders.
  const { rerender } = render(<NumberInput value="1e21" locale="en-GB" />);
  expect(() => rerender(<NumberInput value="1e21" locale="en-GB" />)).not.toThrow();
});

// ---------------------------------------------------------------------------
// percent (style: 'percent'): model-space decimal entry, scaled overlay
// ---------------------------------------------------------------------------

test('infers inputMode="decimal" for style: "percent"', () => {
  render(<NumberInput locale="en-GB" formatOptions={{ style: "percent" }} />);
  expect(screen.getByRole("textbox")).toHaveAttribute("inputMode", "decimal");
});

test("allows the decimal separator in percent mode", () => {
  render(<NumberInput locale="en-GB" formatOptions={{ style: "percent" }} />);
  const input = screen.getByRole("textbox");
  const event = new InputEvent("beforeinput", { data: ".", cancelable: true });
  const prevented = !input.dispatchEvent(event);
  expect(prevented).toBe(false);
});

test('applies a model-space pattern for style: "percent" with default cap', () => {
  render(<NumberInput locale="en-GB" formatOptions={{ style: "percent" }} />);
  expect(screen.getByRole("textbox")).toHaveAttribute("pattern", "-?\\d*(\\.\\d{0,2})?");
});

test("a controlled percent value within the default model cap (2 digits) is valid", () => {
  render(<NumberInput value="0.25" locale="en-GB" formatOptions={{ style: "percent" }} />);
  expect(screen.getByRole("textbox")).toBeValid();
});

test("a controlled percent value exceeding the default model cap is flagged invalid", () => {
  render(<NumberInput value="0.255" locale="en-GB" formatOptions={{ style: "percent" }} />);
  expect(screen.getByRole("textbox")).toBeInvalid();
});

test("percent overlay shows the scaled value without rounding (0.255 → 25.5)", () => {
  // value is stored as model-space decimal; overlay scales to percent display-space.
  const { container } = render(
    <NumberInput value="0.255" locale="en-GB" formatOptions={{ style: "percent" }} />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("25.5");
  expect(overlay).not.toHaveTextContent("%");
});

test("explicit maximumFractionDigits is display-space; model cap = display cap + exponent", () => {
  // maximumFractionDigits: 2 (display) → model cap 4; pattern reflects model cap.
  render(
    <NumberInput locale="en-GB" formatOptions={{ style: "percent", maximumFractionDigits: 2 }} />,
  );
  expect(screen.getByRole("textbox")).toHaveAttribute("pattern", "-?\\d*(\\.\\d{0,4})?");
});

test("percent overlay pads to minimumFractionDigits in display-space", () => {
  const { container } = render(
    <NumberInput
      value="0.5"
      locale="en-GB"
      formatOptions={{ style: "percent", minimumFractionDigits: 2 }}
    />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("50.00");
});

// ---------------------------------------------------------------------------
// unsupported format options: stripped at runtime, overlay never rounds
// ---------------------------------------------------------------------------

test("maximumSignificantDigits does not restrict decimal entry", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render(<NumberInput formatOptions={{ maximumSignificantDigits: 3 } as any} />);
  const input = screen.getByRole("textbox");
  const event = new InputEvent("beforeinput", { data: ".", cancelable: true });
  const prevented = !input.dispatchEvent(event);
  expect(prevented).toBe(false);
});

test("maximumSignificantDigits does not round the overlay", () => {
  const { container } = render(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <NumberInput
      value="1234.5678"
      locale="en-GB"
      formatOptions={{ maximumSignificantDigits: 3 } as any}
    />,
  );
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("1,234.5678");
});
