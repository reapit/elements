import { renderHook, act } from "@testing-library/react";
import type { RefObject } from "react";

import { toastStore } from "../store";
import { useDismissTransition } from "../use-dismiss-transition";

afterEach(() => {
  for (const entry of toastStore.getSnapshot()) {
    toastStore.remove(entry.id);
  }
});

function createItemRef(): RefObject<HTMLLIElement> {
  const el = document.createElement("li");
  return { current: el };
}

test("does not call toastStore.remove when state is visible", () => {
  vi.useFakeTimers();
  const ref = createItemRef();
  const id = toastStore.add({ variant: "neutral", message: "Test" });

  renderHook(() => useDismissTransition(ref, "visible", id));

  act(() => {
    vi.advanceTimersByTime(500);
  });

  expect(toastStore.getSnapshot()).toHaveLength(1);
  vi.useRealTimers();
});

test("calls toastStore.remove when transitionend fires on the element", () => {
  const ref = createItemRef();
  const id = toastStore.add({ variant: "neutral", message: "Test" });

  renderHook(() => useDismissTransition(ref, "dismissing", id));

  act(() => {
    ref.current!.dispatchEvent(new Event("transitionend"));
  });

  expect(toastStore.getSnapshot()).toHaveLength(0);
});

test("calls toastStore.remove via fallback timeout when transitionend never fires", () => {
  vi.useFakeTimers();
  const ref = createItemRef();
  const id = toastStore.add({ variant: "neutral", message: "Test" });

  renderHook(() => useDismissTransition(ref, "dismissing", id));

  act(() => {
    vi.advanceTimersByTime(350);
  });

  expect(toastStore.getSnapshot()).toHaveLength(0);
  vi.useRealTimers();
});

test("only calls toastStore.remove once when multiple transitionend events fire", () => {
  const ref = createItemRef();
  const id = toastStore.add({ variant: "neutral", message: "Test" });
  const removeSpy = vi.spyOn(toastStore, "remove");

  renderHook(() => useDismissTransition(ref, "dismissing", id));

  act(() => {
    ref.current!.dispatchEvent(new Event("transitionend"));
    ref.current!.dispatchEvent(new Event("transitionend"));
    ref.current!.dispatchEvent(new Event("transitionend"));
  });

  expect(removeSpy).toHaveBeenCalledTimes(1);
  removeSpy.mockRestore();
});

test("ignores transitionend events from child elements", () => {
  const ref = createItemRef();
  const child = document.createElement("div");
  ref.current!.appendChild(child);
  const id = toastStore.add({ variant: "neutral", message: "Test" });

  renderHook(() => useDismissTransition(ref, "dismissing", id));

  act(() => {
    // Dispatch on the child — the handler checks event.target !== el
    child.dispatchEvent(new Event("transitionend", { bubbles: true }));
  });

  // Should still be in the store (child event ignored, fallback not yet elapsed)
  expect(toastStore.getSnapshot()).toHaveLength(1);

  // Clean up
  toastStore.remove(id);
});

test("cleans up event listener and fallback timeout on unmount", () => {
  vi.useFakeTimers();
  const ref = createItemRef();
  const id = toastStore.add({ variant: "neutral", message: "Test" });

  const { unmount } = renderHook(() => useDismissTransition(ref, "dismissing", id));

  unmount();

  act(() => {
    vi.advanceTimersByTime(500);
  });

  // Toast should still be in the store — cleanup prevented removal
  expect(toastStore.getSnapshot()).toHaveLength(1);

  toastStore.remove(id);
  vi.useRealTimers();
});
