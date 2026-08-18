import { syncGroupRequired } from "../sync-group-required";

test("sets `required` on every chip when group is required and none are checked", () => {
  const a = createChip(false);
  const b = createChip(false);
  const container = createContainer([a, b]);

  syncGroupRequired(container, true);

  expect(a.required).toBe(true);
  expect(b.required).toBe(true);
});

test("removes `required` from every chip when at least one chip is checked", () => {
  const a = createChip(true);
  const b = createChip(false);
  a.required = true;
  b.required = true;
  const container = createContainer([a, b]);

  syncGroupRequired(container, true);

  expect(a.required).toBe(false);
  expect(b.required).toBe(false);
});

test("removes `required` from every chip when the group is not required", () => {
  const a = createChip(false);
  const b = createChip(false);
  a.required = true;
  b.required = true;
  const container = createContainer([a, b]);

  syncGroupRequired(container, false);

  expect(a.required).toBe(false);
  expect(b.required).toBe(false);
});

test("ignores checkboxes that are not chip options", () => {
  const chip = createChip(false);
  const unrelated = document.createElement("input");
  unrelated.type = "checkbox";
  unrelated.required = false;
  const container = createContainer([chip]);
  container.appendChild(unrelated);

  syncGroupRequired(container, true);

  expect(chip.required).toBe(true);
  expect(unrelated.required).toBe(false);
});

test("no-op when the container has no chip options", () => {
  const container = document.createElement("div");

  expect(() => syncGroupRequired(container, true)).not.toThrow();
});

function createChip(checked: boolean, exclusive = true): HTMLInputElement {
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
