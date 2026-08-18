import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";

import { useListboxSelectionObserver } from "#src/utils/listbox/use-selection-observer";

import { useComboboxHasSelection } from "../use-has-selection";

vi.mock("#src/utils/listbox/use-selection-observer", () => ({
  useListboxSelectionObserver: vi.fn(),
}));

const mockUseListboxSelectionObserver = vi.mocked(useListboxSelectionObserver);

test("returns false when no selections exist", () => {
  mockUseListboxSelectionObserver.mockImplementation(() => {
    // No callback invocation - initial state
  });

  const { result } = renderHook(() => useComboboxHasSelection("test-listbox"));

  expect(result.current).toBe(false);
});

test("returns true when listbox state has selections", async () => {
  let observerCallback:
    | ((visibleOptions: HTMLButtonElement[], listboxState: readonly string[]) => void)
    | null = null;

  mockUseListboxSelectionObserver.mockImplementation((_, callback) => {
    observerCallback = callback;
  });

  const { result } = renderHook(() => useComboboxHasSelection("test-listbox"));

  await act(async () => {
    observerCallback?.([], ["option-1"]);
  });

  expect(result.current).toBe(true);
});

test("returns true when listbox state has multiple selections", async () => {
  let observerCallback:
    | ((visibleOptions: HTMLButtonElement[], listboxState: readonly string[]) => void)
    | null = null;

  mockUseListboxSelectionObserver.mockImplementation((_, callback) => {
    observerCallback = callback;
  });

  const { result } = renderHook(() => useComboboxHasSelection("test-listbox"));

  await act(async () => {
    observerCallback?.([], ["option-1", "option-2"]);
  });

  expect(result.current).toBe(true);
});

test("updates to true when selections are added", async () => {
  let observerCallback:
    | ((visibleOptions: HTMLButtonElement[], listboxState: readonly string[]) => void)
    | null = null;

  mockUseListboxSelectionObserver.mockImplementation((_, callback) => {
    observerCallback = callback;
  });

  const { result } = renderHook(() => useComboboxHasSelection("test-listbox"));

  // Initial state: no selections
  await act(async () => {
    observerCallback?.([], []);
  });

  expect(result.current).toBe(false);

  // Simulate selection change
  await act(async () => {
    observerCallback?.([], ["option-1"]);
  });

  expect(result.current).toBe(true);
});

test("updates to false when all selections are removed", async () => {
  let observerCallback:
    | ((visibleOptions: HTMLButtonElement[], listboxState: readonly string[]) => void)
    | null = null;

  mockUseListboxSelectionObserver.mockImplementation((_, callback) => {
    observerCallback = callback;
  });

  const { result } = renderHook(() => useComboboxHasSelection("test-listbox"));

  // Initial state: has selection
  await act(async () => {
    observerCallback?.([], ["option-1"]);
  });

  expect(result.current).toBe(true);

  // Simulate deselection
  await act(async () => {
    observerCallback?.([], []);
  });

  expect(result.current).toBe(false);
});

test("remains true when selection changes but still has selected options", async () => {
  let observerCallback:
    | ((visibleOptions: HTMLButtonElement[], listboxState: readonly string[]) => void)
    | null = null;

  mockUseListboxSelectionObserver.mockImplementation((_, callback) => {
    observerCallback = callback;
  });

  const { result } = renderHook(() => useComboboxHasSelection("test-listbox"));

  // Initial state: option-1 selected
  await act(async () => {
    observerCallback?.([], ["option-1"]);
  });

  expect(result.current).toBe(true);

  // Change selection to option-2
  await act(async () => {
    observerCallback?.([], ["option-2"]);
  });

  expect(result.current).toBe(true);
});

test("passes listboxId to useListboxSelectionObserver", () => {
  mockUseListboxSelectionObserver.mockImplementation(() => {
    // No-op
  });

  renderHook(() => useComboboxHasSelection("my-custom-listbox-id"));

  expect(mockUseListboxSelectionObserver).toHaveBeenCalledWith(
    "my-custom-listbox-id",
    expect.any(Function),
  );
});
