import { render, screen } from "@testing-library/react";

import { ListboxError } from "../common";
import { setListboxOptionSelectedState } from "../set-listbox-option-selected-state";

test("selects an unselected option when setter returns true", () => {
  render(
    <div id="test-listbox">
      <select multiple>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
    </div>,
  );
  setListboxOptionSelectedState("test-listbox", "option1", () => true);
  expect(screen.getByRole("listbox")).toHaveValue(["option1"]);
});

test("deselects a selected option when setter returns false", () => {
  render(
    <div id="test-listbox">
      <select multiple defaultValue={["option1"]}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
    </div>,
  );
  setListboxOptionSelectedState("test-listbox", "option1", () => false);
  expect(screen.getByRole("listbox")).toHaveValue([]);
});

test("toggles option state when setter returns negated value", () => {
  render(
    <div id="test-listbox">
      <select multiple>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
    </div>,
  );

  setListboxOptionSelectedState("test-listbox", "option1", (selected) => !selected);
  expect(screen.getByRole("listbox")).toHaveValue(["option1"]);

  setListboxOptionSelectedState("test-listbox", "option1", (selected) => !selected);
  expect(screen.getByRole("listbox")).toHaveValue([]);
});

test("setter receives current selected state as parameter", () => {
  render(
    <div id="test-listbox">
      <select multiple defaultValue={["option1"]}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
    </div>,
  );

  const setter = vi.fn((selected: boolean) => selected);

  setListboxOptionSelectedState("test-listbox", "option1", setter);

  expect(setter).toHaveBeenCalledTimes(1);
  expect(setter).toHaveBeenCalledWith(true, expect.any(HTMLSelectElement));

  setListboxOptionSelectedState("test-listbox", "option2", setter);

  expect(setter).toHaveBeenCalledTimes(2);
  expect(setter).toHaveBeenCalledWith(false, expect.any(HTMLSelectElement));
});

test("dispatches input event after updating selected state", () => {
  const handleInput = vi.fn();
  render(
    <div id="test-listbox">
      <select multiple onInput={handleInput}>
        <option value="option1">Option 1</option>
      </select>
    </div>,
  );
  setListboxOptionSelectedState("test-listbox", "option1", () => true);
  expect(handleInput).toHaveBeenCalledTimes(1);
});

test("does NOT dispatch input event if state has not changed", () => {
  const handleInput = vi.fn();
  render(
    <div id="test-listbox">
      <select multiple onInput={handleInput}>
        <option value="option1">Option 1</option>
      </select>
    </div>,
  );
  setListboxOptionSelectedState("test-listbox", "option1", () => false);
  expect(handleInput).not.toHaveBeenCalledTimes(1);
});

test("updates the correct option when multiple options exist", () => {
  render(
    <div id="test-listbox">
      <select multiple>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>,
  );
  setListboxOptionSelectedState("test-listbox", "option2", () => true);
  expect(screen.getByRole("listbox")).toHaveValue(["option2"]);
});

test("throws error when listbox does not exist", () => {
  expect(() =>
    setListboxOptionSelectedState("non-existent-listbox", "option1", () => true),
  ).toThrow(ListboxError);
});

test("throws error when listbox has invalid structure", () => {
  render(
    <div id="invalid-listbox">
      <div>Not a select</div>
    </div>,
  );
  expect(() => setListboxOptionSelectedState("invalid-listbox", "option1", () => true)).toThrow(
    ListboxError,
  );
});

test("throws error when option with specified value does not exist", () => {
  render(
    <div id="test-listbox">
      <select multiple>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
    </div>,
  );
  expect(() =>
    setListboxOptionSelectedState("test-listbox", "non-existent-option", () => true),
  ).toThrow(ListboxError);
});

test("works with single-select (non-multiple) select elements", () => {
  render(
    <div id="test-listbox">
      <select defaultValue="option2">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>,
  );
  setListboxOptionSelectedState("test-listbox", "option1", () => true);
  expect(screen.getByRole("combobox")).toHaveValue("option1");
});
