import { getInputElement } from "../get-input-element";

afterEach(() => {
  document.body.innerHTML = "";
});

test("returns the input element with the given id", () => {
  const input = document.createElement("input");
  input.id = "my-input";
  document.body.appendChild(input);

  expect(getInputElement("my-input")).toBe(input);
});

test("returns null when no element with the given id exists", () => {
  expect(getInputElement("missing")).toBeNull();
});

test("returns null when the element with the given id is not an input", () => {
  const div = document.createElement("div");
  div.id = "not-an-input";
  document.body.appendChild(div);

  expect(getInputElement("not-an-input")).toBeNull();
});
