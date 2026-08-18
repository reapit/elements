import { getComboboxListboxId } from "../get-listbox-id";

test('appends "-listbox" to the combobox id', () => {
  expect(getComboboxListboxId("my-combobox")).toBe("my-combobox-listbox");
});
