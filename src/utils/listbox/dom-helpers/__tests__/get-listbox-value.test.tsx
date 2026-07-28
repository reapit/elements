import { render, screen } from "@testing-library/react";

import { ListboxError } from "../common";
import { getListboxValue } from "../get-listbox-value";

describe("with listboxId parameter", () => {
  describe("multi-select", () => {
    test("returns empty array when no options are selected", () => {
      render(
        <div id="test-listbox">
          <select multiple>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>,
      );
      expect(getListboxValue("test-listbox")).toEqual([]);
    });

    test("returns array with single selected value", () => {
      render(
        <div id="test-listbox">
          <select multiple defaultValue={["option2"]}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>,
      );
      expect(getListboxValue("test-listbox")).toEqual(["option2"]);
    });

    test("returns array with multiple selected values", () => {
      render(
        <div id="test-listbox">
          <select multiple defaultValue={["option1", "option3"]}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>,
      );
      expect(getListboxValue("test-listbox")).toEqual(["option1", "option3"]);
    });

    test("filters out empty string values", () => {
      render(
        <div id="test-listbox">
          <select multiple defaultValue={["", "option1", "option2"]}>
            <option value="">Empty</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </div>,
      );
      expect(getListboxValue("test-listbox")).toEqual(["option1", "option2"]);
    });
  });

  describe("single-select", () => {
    test("returns empty string when no options are selected", () => {
      render(
        <div id="test-listbox">
          <select defaultValue="">
            <option value="">No selection</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>,
      );
      expect(getListboxValue("test-listbox")).toBe("");
    });

    test("returns selected value as string", () => {
      render(
        <div id="test-listbox">
          <select defaultValue="option2">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>,
      );
      expect(getListboxValue("test-listbox")).toBe("option2");
    });

    test("filters out empty string values", () => {
      render(
        <div id="test-listbox">
          <select defaultValue="">
            <option value="">Empty</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </div>,
      );
      expect(getListboxValue("test-listbox")).toBe("");
    });
  });

  test("throws when listbox does not exist", () => {
    expect(() => getListboxValue("non-existent-listbox")).toThrow(ListboxError);
  });

  test("throws when listbox has invalid structure", () => {
    render(
      <div id="invalid-listbox">
        <div>Not a select</div>
      </div>,
    );
    expect(() => getListboxValue("invalid-listbox")).toThrow(ListboxError);
  });
});

describe("with HTMLSelectElement parameter", () => {
  describe("multi-select", () => {
    test("returns empty array when no options are selected", () => {
      render(
        <select multiple>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>,
      );

      const select = screen.getByRole("listbox") as HTMLSelectElement;
      expect(getListboxValue(select)).toEqual([]);
    });

    test("returns array with single selected value", () => {
      render(
        <select multiple defaultValue={["option2"]}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>,
      );

      const select = screen.getByRole("listbox") as HTMLSelectElement;
      expect(getListboxValue(select)).toEqual(["option2"]);
    });

    test("returns array with multiple selected values", () => {
      render(
        <select multiple defaultValue={["option1", "option3", "option4"]}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          <option value="option4">Option 4</option>
        </select>,
      );

      const select = screen.getByRole("listbox") as HTMLSelectElement;
      expect(getListboxValue(select)).toEqual(["option1", "option3", "option4"]);
    });

    test("filters out empty string values", () => {
      render(
        <select multiple defaultValue={["", "option1"]}>
          <option value="">Empty</option>
          <option value="option1">Option 1</option>
        </select>,
      );

      const select = screen.getByRole("listbox") as HTMLSelectElement;
      expect(getListboxValue(select)).toEqual(["option1"]);
    });
  });

  describe("single-select", () => {
    test("returns empty string when no options are selected", () => {
      render(
        <select defaultValue="">
          <option value="">No selection</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>,
      );

      const select = screen.getByRole("combobox") as HTMLSelectElement;
      expect(getListboxValue(select)).toBe("");
    });

    test("returns selected value as string", () => {
      render(
        <select defaultValue="option2">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>,
      );

      const select = screen.getByRole("combobox") as HTMLSelectElement;
      expect(getListboxValue(select)).toBe("option2");
    });

    test("filters out empty string values", () => {
      render(
        <select defaultValue="">
          <option value="">Empty</option>
          <option value="option1">Option 1</option>
        </select>,
      );

      const select = screen.getByRole("combobox") as HTMLSelectElement;
      expect(getListboxValue(select)).toBe("");
    });
  });
});
