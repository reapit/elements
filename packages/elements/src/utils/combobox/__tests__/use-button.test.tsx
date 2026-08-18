import { fireEvent, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";

import { ComboboxContext } from "../context";
import { openComboboxPopup, useComboboxPopupState } from "../popup-dialog";
import { useComboboxButton } from "../use-button";

vi.mock("../combobox-popup");
vi.mock("../popup-dialog");

beforeEach(() => {
  vi.mocked(useComboboxPopupState).mockReturnValue(false);
});

test("returns button props with correct aria-controls", () => {
  const { result } = renderHook(() => useComboboxButton(), {
    wrapper: createWrapper(mockContextValue),
  });
  expect(result.current["aria-controls"]).toBe("test-popup-id");
});

test("returns button props with correct aria-expanded when popup is closed", () => {
  vi.mocked(useComboboxPopupState).mockReturnValue(false);

  const { result } = renderHook(() => useComboboxButton(), {
    wrapper: createWrapper(mockContextValue),
  });
  expect(result.current["aria-expanded"]).toBe(false);
});

test("returns button props with correct aria-expanded when popup is open", () => {
  vi.mocked(useComboboxPopupState).mockReturnValue(true);

  const { result } = renderHook(() => useComboboxButton(), {
    wrapper: createWrapper(mockContextValue),
  });
  expect(result.current["aria-expanded"]).toBe(true);
});

test("returns button props with aria-required false when not required", () => {
  const { result } = renderHook(() => useComboboxButton(), {
    wrapper: createWrapper({ ...mockContextValue, required: false }),
  });
  expect(result.current["aria-required"]).toBe(false);
});

test("returns button props with aria-required true when required", () => {
  const { result } = renderHook(() => useComboboxButton(), {
    wrapper: createWrapper({ ...mockContextValue, required: true }),
  });
  expect(result.current["aria-required"]).toBe(true);
});

test("returns button props with disabled false when not disabled", () => {
  const { result } = renderHook(() => useComboboxButton(), {
    wrapper: createWrapper({ ...mockContextValue, disabled: false }),
  });
  expect(result.current.disabled).toBe(false);
});

test("returns button props with disabled true when disabled", () => {
  const { result } = renderHook(() => useComboboxButton(), {
    wrapper: createWrapper({ ...mockContextValue, disabled: true }),
  });
  expect(result.current.disabled).toBe(true);
});

test("returns button props with correct id", () => {
  const { result } = renderHook(() => useComboboxButton(), {
    wrapper: createWrapper(mockContextValue),
  });
  expect(result.current.id).toBe("test-button-id");
});

test("calls showComboboxPopup when button is clicked", () => {
  const { result } = renderHook(() => useComboboxButton(), {
    wrapper: createWrapper(mockContextValue),
  });

  const button = document.createElement("button");
  fireEvent.click(button, { currentTarget: button });

  result.current.onClick({ currentTarget: button } as any);

  expect(openComboboxPopup).toHaveBeenCalledWith("test-popup-id");
});

test("calls consumer onClick when button is clicked", () => {
  const onClick = vi.fn();
  const { result } = renderHook(() => useComboboxButton({ onClick }), {
    wrapper: createWrapper(mockContextValue),
  });

  const button = document.createElement("button");
  const event = { currentTarget: button } as any;

  result.current.onClick(event);

  expect(onClick).toHaveBeenCalledWith(event);
});

test("calls useComboboxPopupState with popupId", () => {
  renderHook(() => useComboboxButton(), {
    wrapper: createWrapper(mockContextValue),
  });
  expect(useComboboxPopupState).toHaveBeenCalledWith("test-popup-id");
});

function createWrapper(contextValue: ComboboxContext.Value) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <ComboboxContext.Provider value={contextValue}>{children}</ComboboxContext.Provider>;
  };
}

const mockContextValue: ComboboxContext.Value = {
  comboboxId: "test-button-id",
  disabled: false,
  listboxId: "test-listbox-id",
  multiple: false,
  popupId: "test-popup-id",
  required: false,
  searchInputId: "test-search-input-id",
  size: "medium",
};
