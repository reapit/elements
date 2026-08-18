import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { vi } from "vitest";

import { TextInput } from "../text-input";

test("renders an input element in a container div", () => {
  const { container } = render(<TextInput />);
  expect(container.firstElementChild?.tagName).toBe("DIV");
  expect(screen.getByRole("textbox")).toBeVisible();
  expect(screen.getByRole("textbox").parentElement).toBe(container.firstElementChild);
});

test("defaults to a text input", () => {
  render(<TextInput />);
  expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
});

test("defaults to left aligned text", () => {
  render(<TextInput />);
  expect(screen.getByRole("textbox")).toHaveAttribute("data-text-align", "left");
});

test("defaults autoComplete to off", () => {
  render(<TextInput />);
  expect(screen.getByRole("textbox")).toHaveAttribute("autoComplete", "off");
});

test('defaults variant to "default"', () => {
  const { container } = render(<TextInput />);
  expect(container.firstElementChild).toHaveAttribute("data-variant", "default");
});

test("applies the correct input type", () => {
  render(<TextInput type="email" />);
  expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
});

test("applies correct autoComplete when specified", () => {
  render(<TextInput autoComplete="on" />);
  expect(screen.getByRole("textbox")).toHaveAttribute("autoComplete", "on");
});

test("applies `data-show-validity` attribute when `showValidity` is true", () => {
  render(<TextInput showValidity />);
  expect(screen.getByRole("textbox")).toHaveAttribute("data-show-validity", "true");
});

test("applies correct `data-size` attribute", () => {
  const { container } = render(<TextInput size="large" />);
  expect(container.firstElementChild).toHaveAttribute("data-size", "large");
});

test('applies `data-text-align="right"` when suffix present', () => {
  render(<TextInput suffix="%" />);
  expect(screen.getByRole("textbox")).toHaveAttribute("data-text-align", "right");
});

test("applies correct variant when specified", () => {
  const { container } = render(<TextInput variant="borderless" />);
  expect(container.firstElementChild).toHaveAttribute("data-variant", "borderless");
});

test("displays leading icon when supplied", () => {
  render(<TextInput leadingIcon="leading icon" />);
  expect(screen.getByText("leading icon")).toBeVisible();
});

test("displays trailing icon when supplied", () => {
  render(<TextInput trailingIcon="trailing icon" />);
  expect(screen.getByText("trailing icon")).toBeVisible();
});

test("displays prefix when supplied", () => {
  render(<TextInput prefix="$" />);
  expect(screen.getByText("$")).toBeVisible();
});

test("displays suffix when supplied", () => {
  render(<TextInput suffix="%" />);
  expect(screen.getByText("%")).toBeVisible();
});

test("displays spinner when busy", () => {
  const { container } = render(<TextInput isBusy />);
  expect(container.querySelector("svg")).toBeVisible();
  expect(container.querySelector("svg")).toHaveClass("el-text-input-spinner");
});

test("prefers prefix over leading icon when both provided", () => {
  render(<TextInput prefix="$" leadingIcon={<span>icon</span>} />);
  expect(screen.getByText("$")).toBeVisible();
  expect(screen.queryByText("icon")).not.toBeInTheDocument();
});

test("hides suffix when busy", () => {
  render(<TextInput suffix="%" isBusy />);
  expect(screen.queryByText("%")).not.toBeInTheDocument();
});

test("hides trailing icon when busy", () => {
  render(<TextInput trailingIcon={<span>icon</span>} isBusy />);
  expect(screen.queryByText("icon")).not.toBeInTheDocument();
});

test("prefers suffix over trailing icon when both provided", () => {
  render(<TextInput suffix="%" trailingIcon={<span>icon</span>} />);
  expect(screen.getByText("%")).toBeVisible();
  expect(screen.queryByText("icon")).not.toBeInTheDocument();
});

test("forwards `className` to the root container element", () => {
  const { container } = render(<TextInput className="my-class" />);
  expect(container.firstElementChild).toHaveClass("my-class");
  expect(screen.getByRole("textbox")).not.toHaveClass("my-class");
});

test("forwards `style` to the root container element", () => {
  const { container } = render(<TextInput style={{ color: "red" }} />);
  expect(container.firstElementChild).toHaveStyle({ color: "red" });
});

test("forwards additional props to the input element", () => {
  render(<TextInput data-testid="my-input" />);
  expect(screen.getByRole("textbox")).toHaveAttribute("data-testid", "my-input");
});

test("does not render an overlay when formatValue is not provided", () => {
  const { container } = render(<TextInput value="hello" />);
  expect(container.querySelector("[data-formatted-overlay]")).toBeNull();
});

test("renders an overlay when formatValue is provided", () => {
  const formatValue = (value: string) => `formatted:${value}`;
  const { container } = render(<TextInput value="hello" formatValue={formatValue} />);
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).not.toBeNull();
});

test("the overlay text is the result of calling formatValue with the input value", () => {
  const formatValue = (value: string) => value.toUpperCase();
  const { container } = render(<TextInput value="hello" formatValue={formatValue} />);
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveTextContent("HELLO");
});

test("the overlay is aria-hidden", () => {
  const formatValue = (value: string) => value;
  const { container } = render(<TextInput value="test" formatValue={formatValue} />);
  const overlay = container.querySelector("[data-formatted-overlay]");
  expect(overlay).toHaveAttribute("aria-hidden", "true");
});

test("the input value remains unchanged when formatValue is set", () => {
  const formatValue = (value: string) => value.toUpperCase();
  render(<TextInput value="hello" formatValue={formatValue} />);
  expect(screen.getByRole("textbox")).toHaveValue("hello");
});

test("ref.current.value returns the raw value when formatValue is set", () => {
  const ref = createRef<HTMLInputElement>();
  const formatValue = (value: string) => value.toUpperCase();
  render(<TextInput value="hello" formatValue={formatValue} ref={ref} />);
  expect(ref.current?.value).toBe("hello");
});

test("the overlay updates when the controlled value prop changes", () => {
  const formatValue = (value: string) => `$${value}`;
  const { container, rerender } = render(<TextInput value="100" formatValue={formatValue} />);
  expect(container.querySelector("[data-formatted-overlay]")).toHaveTextContent("$100");

  rerender(<TextInput value="200" formatValue={formatValue} />);
  expect(container.querySelector("[data-formatted-overlay]")).toHaveTextContent("$200");
});

test("the overlay works with defaultValue for uncontrolled usage", () => {
  const formatValue = (value: string) => `$${value}`;
  const { container } = render(<TextInput defaultValue="42" formatValue={formatValue} />);
  expect(container.querySelector("[data-formatted-overlay]")).toHaveTextContent("$42");
});

test("the overlay updates after the input is blurred", () => {
  const formatValue = (value: string) => `$${value}`;
  const { container } = render(<TextInput defaultValue="100" formatValue={formatValue} />);
  const input = screen.getByRole("textbox");

  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: "200" } });
  fireEvent.blur(input);

  expect(container.querySelector("[data-formatted-overlay]")).toHaveTextContent("$200");
});

test("the overlay re-syncs when formatValue changes identity", () => {
  const { container, rerender } = render(
    <TextInput defaultValue="42" formatValue={(v) => `a:${v}`} />,
  );
  expect(container.querySelector("[data-formatted-overlay]")).toHaveTextContent("a:42");

  rerender(<TextInput defaultValue="42" formatValue={(v) => `b:${v}`} />);
  expect(container.querySelector("[data-formatted-overlay]")).toHaveTextContent("b:42");
});

test("calls onBlur even when formatValue throws", () => {
  const onBlur = vi.fn();
  render(
    <TextInput
      defaultValue="hello"
      formatValue={() => {
        throw new Error("boom");
      }}
      onBlur={onBlur}
    />,
  );
  fireEvent.blur(screen.getByRole("textbox"));
  expect(onBlur).toHaveBeenCalledTimes(1);
});

test("the overlay re-syncs when the input event fires while the input is unfocused", () => {
  const formatValue = (value: string) => `$${value}`;
  const { container } = render(<TextInput defaultValue="100" formatValue={formatValue} />);
  const input = screen.getByRole<HTMLInputElement>("textbox");

  // Simulate an external value update with a dispatched input event (e.g. autofill).
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, "200");
  fireEvent.input(input);

  expect(container.querySelector("[data-formatted-overlay]")).toHaveTextContent("$200");
});

test("the overlay does not re-sync on input events fired while the input is focused", () => {
  const formatValue = (value: string) => `$${value}`;
  const { container } = render(<TextInput defaultValue="100" formatValue={formatValue} />);
  const input = screen.getByRole<HTMLInputElement>("textbox");

  input.focus();
  // Overlay should stay as the initial value while focused.
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, "200");
  fireEvent.input(input);

  expect(container.querySelector("[data-formatted-overlay]")).toHaveTextContent("$100");
});

test("no overlay is rendered when formatValue throws on initial render for an uncontrolled input", () => {
  const { container } = render(
    <TextInput
      defaultValue="hello"
      formatValue={() => {
        throw new Error("boom");
      }}
    />,
  );
  expect(container.querySelector("[data-formatted-overlay]")).toBeNull();
});

test("the overlay appears on blur after formatValue recovers from an earlier throw", () => {
  let shouldThrow = true;
  const formatValue = (value: string) => {
    if (shouldThrow) throw new Error("boom");
    return value.toUpperCase();
  };

  const { container } = render(<TextInput defaultValue="hello" formatValue={formatValue} />);
  // Initial render: formatValue threw, so no overlay.
  expect(container.querySelector("[data-formatted-overlay]")).toBeNull();

  // formatValue no longer throws; a blur should now produce the overlay.
  shouldThrow = false;
  fireEvent.blur(screen.getByRole("textbox"));

  expect(container.querySelector("[data-formatted-overlay]")).toHaveTextContent("HELLO");
});
