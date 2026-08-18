import { render, screen } from "@testing-library/react";

import { clearListboxValue } from "../clear-listbox-value";
import { ListboxError } from "../common";

test("clears a single selected option", () => {
  render(
    <div id="test-listbox">
      <select multiple defaultValue={["option1"]}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
    </div>,
  );
  const select = screen.getByRole("listbox");
  expect(select).toHaveValue(["option1"]);

  clearListboxValue("test-listbox");

  expect(select).toHaveValue([]);
});

test("clears multiple selected options", () => {
  render(
    <div id="multi-listbox">
      <select multiple defaultValue={["option1", "option2", "option3"]}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>,
  );
  const select = screen.getByRole("listbox");
  expect(select).toHaveValue(["option1", "option2", "option3"]);

  clearListboxValue("multi-listbox");

  expect(select).toHaveValue([]);
});

test("dispatches input event after clearing", () => {
  const handleInput = vi.fn();
  render(
    <div id="event-listbox">
      <select multiple onInput={handleInput} defaultValue={["option1"]}>
        <option value="option1">Option 1</option>
      </select>
    </div>,
  );

  clearListboxValue("event-listbox");

  expect(handleInput).toHaveBeenCalledTimes(1);
});

test("does nothing when no options are selected", () => {
  const handleInput = vi.fn();
  render(
    <div id="empty-selection-listbox">
      <select multiple onInput={handleInput}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
    </div>,
  );

  clearListboxValue("empty-selection-listbox");

  expect(handleInput).not.toHaveBeenCalled();
});

test("throws error when listbox does not exist", () => {
  expect(() => clearListboxValue("non-existent-listbox")).toThrow(ListboxError);
});

test("handles error when listbox has invalid structure", () => {
  render(
    <div id="invalid-listbox">
      <div>Not a select</div>
    </div>,
  );
  expect(() => clearListboxValue("invalid-listbox")).toThrow(ListboxError);
});
