import { render, screen } from "@testing-library/react";

import { Select } from "../select";

test("renders a combobox", () => {
  render(
    <Select>
      <Select.Button />
      <Select.Popup>
        <Select.Listbox />
      </Select.Popup>
    </Select>,
  );
  expect(screen.getByRole("combobox")).toBeVisible();
});

test("renders with listbox", () => {
  render(
    <Select>
      <Select.Button />
      <Select.Popup>
        <Select.Listbox>
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select.Listbox>
      </Select.Popup>
    </Select>,
  );
  expect(screen.getByRole("combobox")).toBeVisible();
});

test("can be disabled", () => {
  render(
    <Select disabled>
      <Select.Button />
      <Select.Popup>
        <Select.Listbox />
      </Select.Popup>
    </Select>,
  );
  expect(screen.getByRole("combobox")).toBeDisabled();
});

test("can be required", () => {
  render(
    <Select required>
      <Select.Button />
      <Select.Popup>
        <Select.Listbox />
      </Select.Popup>
    </Select>,
  );
  expect(screen.getByRole("combobox")).toHaveAttribute("aria-required", "true");
});

test("supports small size", () => {
  const { container } = render(
    <Select size="small">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox />
      </Select.Popup>
    </Select>,
  );
  expect(container.querySelector('[data-size="small"]')).toBeVisible();
});

test("supports medium size", () => {
  const { container } = render(
    <Select size="medium">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox />
      </Select.Popup>
    </Select>,
  );
  expect(container.querySelector('[data-size="medium"]')).toBeVisible();
});

test("supports large size", () => {
  const { container } = render(
    <Select size="large">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox />
      </Select.Popup>
    </Select>,
  );
  expect(container.querySelector('[data-size="large"]')).toBeVisible();
});

test("forwards additional props to underlying element", () => {
  render(
    <Select data-testid="my-Select" className="custom-class">
      <Select.Button />
      <Select.Popup>
        <Select.Listbox />
      </Select.Popup>
    </Select>,
  );
  expect(screen.getByTestId("my-Select")).toBeVisible();
  expect(screen.getByTestId("my-Select")).toHaveClass("custom-class");
});

test("exposes Button component", () => {
  expect(Select.Button).toBeDefined();
});

test("exposes Listbox component", () => {
  expect(Select.Listbox).toBeDefined();
});

test("exposes Option component", () => {
  expect(Select.Option).toBeDefined();
});

test("exposes OptionAdditionalInfo component", () => {
  expect(Select.OptionAdditionalInfo).toBeDefined();
});

test("exposes Optgroup component", () => {
  expect(Select.Optgroup).toBeDefined();
});

test("exposes Popup component", () => {
  expect(Select.Popup).toBeDefined();
});

test("exposes SelectionChips component", () => {
  expect(Select.SelectionChips).toBeDefined();
});

test("exposes getValue utility function", () => {
  expect(Select.getValue).toBeDefined();
});

test("exposes getListboxId utility function", () => {
  expect(Select.getListboxId).toBeDefined();
});

test("exposes getPopupId utility function", () => {
  expect(Select.getPopupId).toBeDefined();
});

test("exposes useState hook", () => {
  expect(Select.useState).toBeDefined();
});
