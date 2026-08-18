import { render, waitFor } from "@testing-library/react";
import { useRef } from "react";

import syncTextareaHeight from "../sync-textarea-height";
import useResizeTextareaEffect from "../use-resize-textarea-effect";

vi.mock("../sync-textarea-height");

beforeEach(() => {
  vi.mocked(syncTextareaHeight).mockClear();
});

test("does NOT sync height when `isEnabled` is false", async () => {
  render(<TestComponent isEnabled={false} value="foo" />);
  await waitFor(() => expect(syncTextareaHeight).not.toHaveBeenCalled());
});

test("syncs height when `isEnabled` is true", async () => {
  render(<TestComponent isEnabled value="foo" />);
  await waitFor(() => expect(syncTextareaHeight).toHaveBeenCalledTimes(1));
});

test("syncs height when `value` is undefined", async () => {
  render(<TestComponent isEnabled />);
  await waitFor(() => expect(syncTextareaHeight).toHaveBeenCalledTimes(1));
});

test("syncs height when `value` changes", async () => {
  const { rerender } = render(<TestComponent isEnabled value="foo" />);
  rerender(<TestComponent isEnabled value="foo\nbar" />);

  await waitFor(() => expect(syncTextareaHeight).toHaveBeenCalledTimes(2));
});

function TestComponent({ isEnabled, value }: { isEnabled: boolean; value?: string }) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const shadowTextAreaRef = useRef<HTMLTextAreaElement>(null);
  useResizeTextareaEffect({ isEnabled, shadowTextAreaRef, textAreaRef, value });

  return (
    <>
      <textarea ref={textAreaRef} />
      <textarea aria-hidden ref={shadowTextAreaRef} />
    </>
  );
}
