import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

import { ChipGroup } from "#src/core/chip-group";
import { setListboxOptionSelectedState } from "#src/utils/listbox/dom-helpers";

import { ComboboxSelectionChipsContext } from "../context";
import { ComboboxSelectionChip } from "../selection-chip";

vi.mock("#src/utils/listbox/dom-helpers");

test("renders the chip with the provided label", () => {
  render(<ComboboxSelectionChip value="apple">Apple</ComboboxSelectionChip>, { wrapper: Wrapper });
  expect(screen.getByText("Apple")).toBeVisible();
});

test("sets aria-controls attribute to the context listboxId", () => {
  render(<ComboboxSelectionChip value="apple">Apple</ComboboxSelectionChip>, {
    wrapper: (props) => <Wrapper {...props} listboxId="my-custom-listbox" />,
  });
  const chip = screen.getByRole("button");
  expect(chip).toHaveAttribute("aria-controls", "my-custom-listbox");
});

test('sets aria-label to "Remove {label}"', () => {
  render(<ComboboxSelectionChip value="banana">Banana</ComboboxSelectionChip>, {
    wrapper: Wrapper,
  });
  expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Remove Banana");
});

test("calls setListboxOptionSelectedState with correct arguments when clicked", () => {
  render(<ComboboxSelectionChip value="orange">Orange</ComboboxSelectionChip>, {
    wrapper: (props) => <Wrapper {...props} listboxId="fruit-listbox" />,
  });

  fireEvent.click(screen.getByRole("button"));

  expect(setListboxOptionSelectedState).toHaveBeenCalledWith(
    "fruit-listbox",
    "orange",
    expect.any(Function),
  );
});

test("passes setter function that always returns false", () => {
  render(<ComboboxSelectionChip value="grape">Grape</ComboboxSelectionChip>, { wrapper: Wrapper });

  fireEvent.click(screen.getByRole("button"));

  const setterFunction = vi.mocked(setListboxOptionSelectedState).mock.calls[0][2];
  const mockSelectElement = document.createElement("select") as HTMLSelectElement;
  expect(setterFunction(true, mockSelectElement)).toBe(false);
  expect(setterFunction(false, mockSelectElement)).toBe(false);
});

test("forwards additional props to ChipGroup.Item", () => {
  render(
    <ComboboxSelectionChip value="mango" data-testid="custom-chip" className="custom-class">
      Mango
    </ComboboxSelectionChip>,
    { wrapper: Wrapper },
  );
  const chip = screen.getByTestId("custom-chip");
  expect(chip).toBeVisible();
  expect(chip).toHaveClass("custom-class");
});

test("uses the value prop as the chip value", () => {
  render(<ComboboxSelectionChip value="pineapple-123">Pineapple</ComboboxSelectionChip>, {
    wrapper: Wrapper,
  });
  const chip = screen.getByRole("button");
  expect(chip).toHaveValue("pineapple-123");
});

test("throws error when rendered outside ComboboxSelectionChipsContext", () => {
  const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

  expect(() => {
    render(
      <ChipGroup variant="selection">
        <ComboboxSelectionChip value="test">Test</ComboboxSelectionChip>
      </ChipGroup>,
    );
  }).toThrow("useComboboxSelectionChipsContext requires a ComboboxSelectionChips ancestor");

  consoleError.mockRestore();
});

test("handles click on chip with special characters in label", () => {
  render(<ComboboxSelectionChip value="test-value">Test & Value</ComboboxSelectionChip>, {
    wrapper: Wrapper,
  });

  fireEvent.click(screen.getByRole("button"));

  expect(setListboxOptionSelectedState).toHaveBeenCalledWith(
    "test-listbox",
    "test-value",
    expect.any(Function),
  );
});

test("sets correct aria-label with special characters", () => {
  render(<ComboboxSelectionChip value="apple">Apple</ComboboxSelectionChip>, { wrapper: Wrapper });
  expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Remove Apple");
});

interface WrapperProps {
  children: ReactNode;
  listboxId?: string;
}

function Wrapper({ children, listboxId = "test-listbox" }: WrapperProps) {
  return (
    <ChipGroup variant="selection">
      <ComboboxSelectionChipsContext.Provider value={{ listboxId }}>
        {children}
      </ComboboxSelectionChipsContext.Provider>
    </ChipGroup>
  );
}
