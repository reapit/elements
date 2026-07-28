import { render, screen } from "@testing-library/react";

import { OfficeSwitcher } from "../office-switcher";

test("renders children inside popup", () => {
  render(
    <OfficeSwitcher.Select>
      <OfficeSwitcher.Popup>
        <div data-testid="popup-content">Popup content</div>
      </OfficeSwitcher.Popup>
    </OfficeSwitcher.Select>,
  );
  expect(screen.getByRole("dialog", { hidden: true })).toBeInTheDocument();
});

test("uses auto as default closeOnSelection value", () => {
  render(
    <OfficeSwitcher.Select>
      <OfficeSwitcher.Popup>
        <OfficeSwitcher.Listbox />
      </OfficeSwitcher.Popup>
    </OfficeSwitcher.Select>,
  );
  expect(screen.getByRole("dialog", { hidden: true })).toHaveAttribute(
    "data-close-on-selection",
    "auto",
  );
});

test("accepts closeOnSelection prop", () => {
  render(
    <OfficeSwitcher.Select>
      <OfficeSwitcher.Popup closeOnSelection="never">
        <OfficeSwitcher.Listbox />
      </OfficeSwitcher.Popup>
    </OfficeSwitcher.Select>,
  );
  expect(screen.getByRole("dialog", { hidden: true })).toHaveAttribute(
    "data-close-on-selection",
    "never",
  );
});

test("forwards additional props to underlying element", () => {
  render(
    <OfficeSwitcher.Select>
      <OfficeSwitcher.Popup data-testid="my-popup">
        <OfficeSwitcher.Listbox />
      </OfficeSwitcher.Popup>
    </OfficeSwitcher.Select>,
  );
  expect(screen.getByTestId("my-popup")).toBe(screen.getByRole("dialog", { hidden: true }));
});
