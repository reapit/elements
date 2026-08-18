import { fireEvent, render, screen } from "@testing-library/react";

import { openComboboxPopup } from "../../popup-dialog";
import { ComboboxButtonOpenPopupButton } from "../open-popup-button";

vi.mock("../../popup-dialog");

test("renders a button element", () => {
  render(<ComboboxButtonOpenPopupButton aria-controls="popup-1" />);
  expect(screen.getByRole("button", { name: "Open popup" })).toBeVisible();
});

test("uses custom aria-label when provided", () => {
  render(<ComboboxButtonOpenPopupButton aria-controls="popup-1" aria-label="Open options" />);
  expect(screen.getByRole("button", { name: "Open options" })).toBeVisible();
});

test("applies aria-controls attribute to the button", () => {
  render(<ComboboxButtonOpenPopupButton aria-controls="my-popup" />);
  expect(screen.getByRole("button")).toHaveAttribute("aria-controls", "my-popup");
});

test("has tabIndex of -1", () => {
  render(<ComboboxButtonOpenPopupButton aria-controls="popup-1" />);
  expect(screen.getByRole("button")).toHaveAttribute("tabIndex", "-1");
});

test("applies small size to the button", () => {
  render(<ComboboxButtonOpenPopupButton aria-controls="popup-1" />);
  expect(screen.getByRole("button")).toHaveAttribute("data-size", "small");
});

test("applies tertiary variant to the button", () => {
  render(<ComboboxButtonOpenPopupButton aria-controls="popup-1" />);
  expect(screen.getByRole("button")).toHaveAttribute("data-variant", "tertiary");
});

test("applies hasNoPadding prop to button", () => {
  render(<ComboboxButtonOpenPopupButton aria-controls="popup-1" />);
  expect(screen.getByRole("button")).toHaveAttribute("data-has-no-padding", "true");
});

test("displays chevron down icon", () => {
  const { container } = render(<ComboboxButtonOpenPopupButton aria-controls="popup-1" />);
  const svg = container.querySelector("svg");
  expect(svg).toBeInTheDocument();
});

test("calls togglePopup with aria-controls value when clicked", () => {
  render(<ComboboxButtonOpenPopupButton aria-controls="my-popup" />);

  const button = screen.getByRole("button");
  fireEvent.click(button);

  expect(openComboboxPopup).toHaveBeenCalledWith("my-popup");
});

test("calls custom onClick handler when provided", () => {
  const onClick = vi.fn();
  render(<ComboboxButtonOpenPopupButton aria-controls="popup-1" onClick={onClick} />);

  const button = screen.getByRole("button");
  fireEvent.click(button);

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("forwards additional props to the button element", () => {
  render(
    <ComboboxButtonOpenPopupButton
      aria-controls="popup-1"
      data-testid="toggle-btn"
      className="custom-class"
    />,
  );
  expect(screen.getByTestId("toggle-btn")).toBeVisible();
  expect(screen.getByTestId("toggle-btn")).toHaveClass("custom-class");
});
