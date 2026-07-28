import { hasOtherCheckedOption } from "../has-other-checked-option";

test("returns true when another chip option is checked", () => {
  const target = createCheckbox(false);
  const other = createCheckbox(true);
  const container = createContainer([target, other]);

  expect(hasOtherCheckedOption(container, target)).toBe(true);
});

test("returns false when no other chip option is checked", () => {
  const target = createCheckbox(true);
  const other = createCheckbox(false);
  const container = createContainer([target, other]);

  expect(hasOtherCheckedOption(container, target)).toBe(false);
});

test("ignores the current target even when it is checked", () => {
  const target = createCheckbox(true);
  const container = createContainer([target]);

  expect(hasOtherCheckedOption(container, target)).toBe(false);
});

test("ignores checkboxes inside the container that are not chip options", () => {
  const target = createCheckbox(false);
  const unrelated = document.createElement("input");
  unrelated.type = "checkbox";
  unrelated.checked = true;
  const container = createContainer([target]);
  container.appendChild(unrelated);

  expect(hasOtherCheckedOption(container, target)).toBe(false);
});

test('matches multi-select chip options (data-exclusive="false")', () => {
  const target = createCheckbox(false, false);
  const other = createCheckbox(true, false);
  const container = createContainer([target, other]);

  expect(hasOtherCheckedOption(container, target)).toBe(true);
});

function createCheckbox(checked: boolean, exclusive = true): HTMLInputElement {
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = checked;
  input.dataset.exclusive = exclusive.toString();
  return input;
}

function createContainer(children: HTMLInputElement[]): HTMLDivElement {
  const container = document.createElement("div");
  children.forEach((child) => container.appendChild(child));
  return container;
}
