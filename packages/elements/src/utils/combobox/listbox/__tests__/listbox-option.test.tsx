import { render, screen } from "@testing-library/react";

import { ListboxContext } from "#src/utils/listbox/context";
import { ListboxRenderContext } from "#src/utils/listbox/render-context";

import { ComboboxContext } from "../../context";
import { ComboboxListboxOption } from "../listbox-option";

test("renders as an option", () => {
  render(
    <ComboboxContext.Provider value={defaultComboboxContext}>
      <ListboxContext.Provider value={defaultListboxContext}>
        <ListboxRenderContext.Provider value="custom">
          <ComboboxListboxOption value="1" />
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>
    </ComboboxContext.Provider>,
  );
  expect(screen.getByRole("option")).toBeVisible();
});

test("has size specified by ComboboxContext", () => {
  render(
    <ComboboxContext.Provider value={{ ...defaultComboboxContext, size: "large" }}>
      <ListboxContext.Provider value={defaultListboxContext}>
        <ListboxRenderContext.Provider value="custom">
          <ComboboxListboxOption value="1" />
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>
    </ComboboxContext.Provider>,
  );
  expect(screen.getByRole("option")).toHaveAttribute("data-size", "large");
});

test("promotes small size to medium", () => {
  render(
    <ComboboxContext.Provider value={{ ...defaultComboboxContext, size: "small" }}>
      <ListboxContext.Provider value={defaultListboxContext}>
        <ListboxRenderContext.Provider value="custom">
          <ComboboxListboxOption value="1" />
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>
    </ComboboxContext.Provider>,
  );
  expect(screen.getByRole("option")).toHaveAttribute("data-size", "medium");
});

const defaultComboboxContext: ComboboxContext.Value = {
  comboboxId: "button-id",
  disabled: false,
  listboxId: "listbox-id",
  multiple: false,
  popupId: "popup-id",
  required: false,
  searchInputId: "search-input-id",
  size: "medium",
};

const defaultListboxContext: ListboxContext.Value = {
  disabled: false,
  listboxId: "my-listbox",
  multiple: false,
  role: "listbox",
  selectAction: "toggle",
  selectValue: [],
};
