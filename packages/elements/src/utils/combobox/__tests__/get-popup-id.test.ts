import { getComboboxPopupId } from "../get-popup-id";

test('appends "-popup" to the combobox id', () => {
  expect(getComboboxPopupId("my-combobox")).toBe("my-combobox-popup");
});
