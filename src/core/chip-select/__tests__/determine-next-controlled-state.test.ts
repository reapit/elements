import { determineNextControlledState } from "../determine-next-controlled-state";

test("when exclusive option is checked, returns an array with that option's value", () => {
  const currentValue = ["option1"];
  const option = createInputOption("option2", true, true);
  const result = determineNextControlledState(currentValue, option);
  expect(result).toEqual(["option2"]);
});

test("when exclusive option is unchecked, returns empty array", () => {
  const currentValue = ["option1"];
  const option = createInputOption("option1", false, true);
  const result = determineNextControlledState(currentValue, option);
  expect(result).toEqual([]);
});

test("when non-exclusive option checked, returns array with option's value appended to existing values", () => {
  const currentValue = ["option1", "option2"];
  const option = createInputOption("option3", true, false);
  const result = determineNextControlledState(currentValue, option);
  expect(result).toEqual(["option1", "option2", "option3"]);
});

test("when non-exclusive option unchecked, returns array with option's value removed from existing values", () => {
  const currentValue = ["option1", "option2", "option3"];
  const option = createInputOption("option2", false, false);
  const result = determineNextControlledState(currentValue, option);
  expect(result).toEqual(["option1", "option3"]);
});

test("when required exclusive option is unchecked and it is the last selected, returns current value unchanged", () => {
  const currentValue = ["option1"];
  const option = createInputOption("option1", false, true, { required: true });
  const result = determineNextControlledState(currentValue, option);
  expect(result).toEqual(["option1"]);
});

test("when required non-exclusive option is unchecked and it is the last selected, returns current value unchanged", () => {
  const currentValue = ["option1"];
  const option = createInputOption("option1", false, false, { required: true });
  const result = determineNextControlledState(currentValue, option);
  expect(result).toEqual(["option1"]);
});

test("when required non-exclusive option is unchecked but others remain selected, removes the value", () => {
  const currentValue = ["option1", "option2"];
  const option = createInputOption("option1", false, false, { required: true });
  const result = determineNextControlledState(currentValue, option);
  expect(result).toEqual(["option2"]);
});

function createInputOption(
  value: string,
  checked: boolean,
  exclusive: boolean,
  { required = false }: { required?: boolean } = {},
): HTMLInputElement {
  const input = document.createElement("input");
  input.type = "checkbox";
  input.value = value;
  input.checked = checked;
  input.required = required;
  input.dataset.exclusive = exclusive.toString();
  return input;
}
