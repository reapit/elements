import { render, screen } from "@testing-library/react";

import { ComboboxContext } from "#src/utils/combobox/context";
import { ListboxContext } from "#src/utils/listbox/context";
import { ListboxRenderContext } from "#src/utils/listbox/render-context";

import { OfficeSwitcherSelectOption } from "../office-switcher-select-option";

test("renders as an option", () => {
  render(
    <ComboboxContext.Provider value={defaultComboboxContext}>
      <ListboxContext.Provider value={defaultListboxContext}>
        <ListboxRenderContext.Provider value="custom">
          <OfficeSwitcherSelectOption value="1">Office 1</OfficeSwitcherSelectOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>
    </ComboboxContext.Provider>,
  );
  expect(screen.getByRole("option")).toBeVisible();
});

test("renders office name", () => {
  render(
    <ComboboxContext.Provider value={defaultComboboxContext}>
      <ListboxContext.Provider value={defaultListboxContext}>
        <ListboxRenderContext.Provider value="custom">
          <OfficeSwitcherSelectOption value="1">Head Office</OfficeSwitcherSelectOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>
    </ComboboxContext.Provider>,
  );
  expect(screen.getByRole("option", { name: "Head Office" })).toBeVisible();
});

test("can display a badge", () => {
  render(
    <ComboboxContext.Provider value={defaultComboboxContext}>
      <ListboxContext.Provider value={defaultListboxContext}>
        <ListboxRenderContext.Provider value="custom">
          <OfficeSwitcherSelectOption value="1" badge="Main">
            Head Office
          </OfficeSwitcherSelectOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>
    </ComboboxContext.Provider>,
  );
  expect(screen.getByText("Main")).toBeVisible();
});

test("forwards additional props to the option element", () => {
  render(
    <ComboboxContext.Provider value={defaultComboboxContext}>
      <ListboxContext.Provider value={defaultListboxContext}>
        <ListboxRenderContext.Provider value="custom">
          <OfficeSwitcherSelectOption value="1" data-testid="custom-option">
            Head Office
          </OfficeSwitcherSelectOption>
        </ListboxRenderContext.Provider>
      </ListboxContext.Provider>
    </ComboboxContext.Provider>,
  );
  expect(screen.getByTestId("custom-option")).toBe(screen.getByRole("option"));
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
