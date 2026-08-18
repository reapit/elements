import { render, screen } from "@testing-library/react";

import { Listbox } from "#src/utils/listbox";

import { AtAGlanceListbox } from "../listbox";

test("renders as a listbox", () => {
  render(
    <AtAGlanceListbox name="test">
      <AtAGlanceListbox.Option value="option1" label="Option 1" displayValue="Value 1" />
    </AtAGlanceListbox>,
  );
  expect(screen.getByRole("listbox")).toBeVisible();
});

test("applies horizontal orientation by default", () => {
  render(
    <AtAGlanceListbox name="test">
      <AtAGlanceListbox.Option value="option1" label="Option 1" displayValue="Value 1" />
    </AtAGlanceListbox>,
  );
  expect(screen.getByRole("listbox")).toHaveAttribute("aria-orientation", "horizontal");
});

test("disabled selectFollowsFocus", () => {
  render(
    <AtAGlanceListbox name="test">
      <AtAGlanceListbox.Option value="option1" label="Option 1" displayValue="Value 1" />
    </AtAGlanceListbox>,
  );
  expect(screen.getByRole("listbox")).toHaveAttribute("data-selection-follows-focus", "false");
});

test("applies toggle select action", () => {
  render(
    <AtAGlanceListbox name="test">
      <AtAGlanceListbox.Option value="option1" label="Option 1" displayValue="Value 1" />
    </AtAGlanceListbox>,
  );
  expect(screen.getByRole("option")).toHaveAttribute("data-select-action", "toggle");
});

test("exposes AtAGlanceListbox.Option", () => {
  expect(AtAGlanceListbox.Option).toBeDefined();
  expect(AtAGlanceListbox.Option).toBe(AtAGlanceListbox.Option);
});

test("exposes AtAGlanceListbox.getValue", () => {
  expect(AtAGlanceListbox.getValue).toBeDefined();
  expect(AtAGlanceListbox.getValue).toBe(Listbox.getValue);
});

test("handles single selection", () => {
  render(
    <AtAGlanceListbox name="test" value={["option1"]}>
      <AtAGlanceListbox.Option value="option1" label="Option 1" displayValue="Value 1" />
      <AtAGlanceListbox.Option value="option2" label="Option 2" displayValue="Value 2" />
    </AtAGlanceListbox>,
  );

  const options = screen.getAllByRole("option");
  expect(options[0]).toHaveAttribute("aria-selected", "true");
  expect(options[1]).not.toHaveAttribute("aria-selected", "true");
});

test("handles multi-selection", () => {
  render(
    <AtAGlanceListbox name="test" value={["option1", "option2"]} aria-multiselectable>
      <AtAGlanceListbox.Option value="option1" label="Option 1" displayValue="Value 1" />
      <AtAGlanceListbox.Option value="option2" label="Option 2" displayValue="Value 2" />
      <AtAGlanceListbox.Option value="option3" label="Option 3" displayValue="Value 3" />
    </AtAGlanceListbox>,
  );

  const options = screen.getAllByRole("option");
  expect(options[0]).toHaveAttribute("aria-checked", "true");
  expect(options[1]).toHaveAttribute("aria-checked", "true");
  expect(options[2]).not.toHaveAttribute("aria-checked", "true");
});

test("forwards additional props to the underlying listbox", () => {
  render(
    <AtAGlanceListbox name="test" data-testid="custom-listbox">
      <AtAGlanceListbox.Option value="option1" label="Option 1" displayValue="Value 1" />
    </AtAGlanceListbox>,
  );
  expect(screen.getByTestId("custom-listbox")).toBeVisible();
});
