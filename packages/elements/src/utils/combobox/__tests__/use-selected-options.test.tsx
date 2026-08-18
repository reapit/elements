import { render, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";

import { useComboboxSelectedOptions } from "../use-selected-options";

test("returns empty array when no selections exist", () => {
  const selections: any[] = [];

  render(
    <TestComboboxSelectedOptions
      onSelectionsChange={(selected) => {
        selections.push(selected);
      }}
    >
      <button aria-labelledby="label-1" role="option" value="option-1">
        <span id="label-1">Option 1</span>
      </button>
      <button aria-labelledby="label-2" role="option" value="option-2">
        <span id="label-2">Option 2</span>
      </button>
    </TestComboboxSelectedOptions>,
  );

  expect(selections[0]).toEqual([]);
});

test("returns selection when option has aria-selected", async () => {
  const selections: any[] = [];

  render(
    <TestComboboxSelectedOptions
      onSelectionsChange={(selected) => {
        selections.push(selected);
      }}
    >
      <button aria-labelledby="label-1" aria-selected role="option" value="option-1">
        <span id="label-1">Option 1</span>
      </button>
      <button aria-labelledby="label-2" role="option" value="option-2">
        <span id="label-2">Option 2</span>
      </button>
    </TestComboboxSelectedOptions>,
  );

  await waitFor(() => {
    expect(selections[selections.length - 1]).toEqual([{ label: "Option 1", value: "option-1" }]);
  });
});

test("returns selection when option has aria-checked", async () => {
  const selections: any[] = [];

  render(
    <TestComboboxSelectedOptions
      onSelectionsChange={(selected) => {
        selections.push(selected);
      }}
    >
      <button aria-checked aria-labelledby="label-1" role="option" value="option-1">
        <span id="label-1">Option 1</span>
      </button>
      <button aria-labelledby="label-2" role="option" value="option-2">
        <span id="label-2">Option 2</span>
      </button>
    </TestComboboxSelectedOptions>,
  );

  await waitFor(() => {
    expect(selections[selections.length - 1]).toEqual([{ label: "Option 1", value: "option-1" }]);
  });
});

test("returns multiple selections when multiple options are selected", async () => {
  const selections: any[] = [];

  render(
    <TestComboboxSelectedOptions
      onSelectionsChange={(selected) => {
        selections.push(selected);
      }}
    >
      <button aria-labelledby="label-1" aria-selected role="option" value="option-1">
        <span id="label-1">Option 1</span>
      </button>
      <button aria-labelledby="label-2" aria-selected role="option" value="option-2">
        <span id="label-2">Option 2</span>
      </button>
      <button aria-labelledby="label-3" role="option" value="option-3">
        <span id="label-3">Option 3</span>
      </button>
    </TestComboboxSelectedOptions>,
  );

  await waitFor(() => {
    expect(selections[selections.length - 1]).toEqual([
      { label: "Option 1", value: "option-1" },
      { label: "Option 2", value: "option-2" },
    ]);
  });
});

test("updates selections when selection changes", async () => {
  const selections: any[] = [];

  const { rerender } = render(
    <TestComboboxSelectedOptions
      onSelectionsChange={(selected) => {
        selections.push(selected);
      }}
    >
      <button aria-labelledby="label-1" role="option" value="option-1">
        <span id="label-1">Option 1</span>
      </button>
      <button aria-labelledby="label-2" role="option" value="option-2">
        <span id="label-2">Option 2</span>
      </button>
    </TestComboboxSelectedOptions>,
  );

  expect(selections[0]).toEqual([]);

  rerender(
    <TestComboboxSelectedOptions
      onSelectionsChange={(selected) => {
        selections.push(selected);
      }}
    >
      <button aria-labelledby="label-1" aria-selected role="option" value="option-1">
        <span id="label-1">Option 1</span>
      </button>
      <button aria-labelledby="label-2" role="option" value="option-2">
        <span id="label-2">Option 2</span>
      </button>
    </TestComboboxSelectedOptions>,
  );

  await waitFor(() => {
    expect(selections[selections.length - 1]).toEqual([{ label: "Option 1", value: "option-1" }]);
  });
});

test("extracts label from aria-labelledby element", async () => {
  const selections: any[] = [];

  render(
    <TestComboboxSelectedOptions
      onSelectionsChange={(selected) => {
        selections.push(selected);
      }}
    >
      <button aria-labelledby="custom-label" aria-selected role="option" value="test-value">
        <span id="custom-label">Custom Label Text</span>
      </button>
    </TestComboboxSelectedOptions>,
  );

  await waitFor(() => {
    expect(selections[selections.length - 1]).toEqual([
      { label: "Custom Label Text", value: "test-value" },
    ]);
  });
});

test("extracts value property from option elements", async () => {
  const selections: any[] = [];

  render(
    <TestComboboxSelectedOptions
      onSelectionsChange={(selected) => {
        selections.push(selected);
      }}
    >
      <button aria-labelledby="label-1" aria-selected role="option" value="custom-value-123">
        <span id="label-1">Option Text</span>
      </button>
    </TestComboboxSelectedOptions>,
  );

  await waitFor(() => {
    expect(selections[selections.length - 1][0].value).toBe("custom-value-123");
  });
});

test("replaces selections when selection changes", async () => {
  const selections: any[] = [];

  const { rerender } = render(
    <TestComboboxSelectedOptions
      onSelectionsChange={(selected) => {
        selections.push(selected);
      }}
    >
      <button aria-labelledby="label-1" aria-selected role="option" value="option-1">
        <span id="label-1">Option 1</span>
      </button>
      <button aria-labelledby="label-2" role="option" value="option-2">
        <span id="label-2">Option 2</span>
      </button>
    </TestComboboxSelectedOptions>,
  );

  await waitFor(() => {
    expect(selections[selections.length - 1]).toEqual([{ label: "Option 1", value: "option-1" }]);
  });

  rerender(
    <TestComboboxSelectedOptions
      onSelectionsChange={(selected) => {
        selections.push(selected);
      }}
    >
      <button aria-labelledby="label-1" role="option" value="option-1">
        <span id="label-1">Option 1</span>
      </button>
      <button aria-labelledby="label-2" aria-selected role="option" value="option-2">
        <span id="label-2">Option 2</span>
      </button>
    </TestComboboxSelectedOptions>,
  );

  await waitFor(() => {
    expect(selections[selections.length - 1]).toEqual([{ label: "Option 2", value: "option-2" }]);
  });
});

test("clears selections when all options are deselected", async () => {
  const selections: any[] = [];

  const { rerender } = render(
    <TestComboboxSelectedOptions
      onSelectionsChange={(selected) => {
        selections.push(selected);
      }}
    >
      <button aria-labelledby="label-1" aria-selected role="option" value="option-1">
        <span id="label-1">Option 1</span>
      </button>
      <button aria-labelledby="label-2" aria-selected role="option" value="option-2">
        <span id="label-2">Option 2</span>
      </button>
    </TestComboboxSelectedOptions>,
  );

  await waitFor(() => {
    expect(selections[selections.length - 1].length).toBe(2);
  });

  rerender(
    <TestComboboxSelectedOptions
      onSelectionsChange={(selected) => {
        selections.push(selected);
      }}
    >
      <button aria-labelledby="label-1" role="option" value="option-1">
        <span id="label-1">Option 1</span>
      </button>
      <button aria-labelledby="label-2" role="option" value="option-2">
        <span id="label-2">Option 2</span>
      </button>
    </TestComboboxSelectedOptions>,
  );

  await waitFor(() => {
    expect(selections[selections.length - 1]).toEqual([]);
  });
});

interface TestComboboxSelectedOptionsProps {
  listboxId?: string;
  onSelectionsChange: (selections: readonly useComboboxSelectedOptions.Option[]) => void;
  children?: ReactNode;
}

function TestComboboxSelectedOptions({
  listboxId = "test-listbox",
  onSelectionsChange,
  children,
}: TestComboboxSelectedOptionsProps) {
  const selections = useComboboxSelectedOptions(listboxId);
  onSelectionsChange(selections);
  return (
    <div id={listboxId} role="listbox">
      <select id={`${listboxId}-select`} hidden />
      {children}
    </div>
  );
}
