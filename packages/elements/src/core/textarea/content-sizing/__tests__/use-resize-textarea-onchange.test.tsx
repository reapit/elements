import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRef } from "react";
import type { ChangeEventHandler } from "react";

import syncTextareaHeight from "../sync-textarea-height";
import useResizeTextareaOnChange from "../use-resize-textarea-onchange";

vi.mock("../sync-textarea-height");

beforeEach(() => {
  vi.mocked(syncTextareaHeight).mockClear();
});

test("always calls `onChange`", async () => {
  const onChange = vi.fn();

  const { rerender } = render(<TestComponent isEnabled={false} onChange={onChange} />);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "foo" } });

  await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));

  rerender(<TestComponent isEnabled={true} onChange={onChange} />);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "foo\nbar" } });

  await waitFor(() => expect(onChange).toHaveBeenCalledTimes(2));
});

test("syncs height when `isEnabled` is true", async () => {
  const onChange = vi.fn();

  render(<TestComponent isEnabled onChange={onChange} />);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "foo" } });

  await waitFor(() => expect(syncTextareaHeight).toHaveBeenCalled());
});

test("syncs value when `isEnabled` is true", async () => {
  const onChange = vi.fn();

  render(<TestComponent isEnabled onChange={onChange} />);

  const textArea = screen.getByRole("textbox") as HTMLTextAreaElement;
  fireEvent.change(textArea, { target: { value: "foo" } });

  const shadowTextArea = screen.getByTestId("shadow") as HTMLTextAreaElement;
  await waitFor(() => expect(shadowTextArea.value).toBe(textArea.value));
});

test("does NOT sync height when `isEnabled` is false", async () => {
  const onChange = vi.fn();

  render(<TestComponent isEnabled={false} onChange={onChange} />);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "foo" } });

  await waitFor(() => expect(syncTextareaHeight).not.toHaveBeenCalled());
});

test("does NOT sync height when change event default is prevented", async () => {
  const onChange = vi
    .fn()
    .mockImplementation(((event) => event.preventDefault()) as ChangeEventHandler);

  render(<TestComponent isEnabled onChange={onChange} />);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "foo" } });

  await waitFor(() => expect(syncTextareaHeight).not.toHaveBeenCalled());
});

function TestComponent({
  isEnabled,
  onChange,
}: {
  isEnabled: boolean;
  onChange: ChangeEventHandler;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const shadowTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleChange = useResizeTextareaOnChange({ isEnabled, shadowTextAreaRef, textAreaRef });

  return (
    <>
      <textarea ref={textAreaRef} onChange={handleChange(onChange)} />
      <textarea data-testid="shadow" aria-hidden ref={shadowTextAreaRef} />
    </>
  );
}
