import { fireEvent, render, screen } from "@testing-library/react";

import { useCloseTopBarMenuDrawerOnClick } from "../use-close-menu-on-click";

beforeEach(() => {
  if (!("isTrusted" in MouseEvent.prototype)) {
    Object.defineProperty(MouseEvent.prototype, "isTrusted", { value: true });
  }
});

test("closes the dialog by default for anchor click events", () => {
  render(<TestComponent />);

  const dialog = screen.getByTestId("test-dialog");
  const element = screen.getByRole("link", { name: "Item 1" });

  expect(dialog).toBeVisible();

  fireEvent.click(element);

  expect(screen.getByTestId("test-dialog")).not.toBeVisible();
});

test("closes the dialog by default for anchor descendant click events", () => {
  render(<TestComponent />);

  const element = screen.getByTestId("item-2-inner-span");

  fireEvent.click(element);

  expect(screen.getByTestId("test-dialog")).not.toBeVisible();
});

test("closes the dialog when default action has been prevented by an anchor element", () => {
  render(<TestComponent />);

  const element = screen.getByRole("link", { name: "Anchor that prevents default" });
  fireEvent.click(element);

  expect(screen.getByTestId("test-dialog")).not.toBeVisible();
});

test("does not close the dialog when event target is not an anchor or anchor descendant", () => {
  render(<TestComponent />);

  const element = screen.getByRole("button", { name: "Button that will not close the menu" });
  fireEvent.click(element);

  expect(screen.getByTestId("test-dialog")).toBeVisible();
});

function TestComponent() {
  const handleClick = useCloseTopBarMenuDrawerOnClick();

  return (
    <dialog data-testid="test-dialog" open>
      <div onClick={handleClick}>
        <a href="#">Item 1</a>
        <a href="#">
          <span data-testid="item-2-inner-span">Item 2</span>
        </a>
        <a href="#" onClick={(e) => e.preventDefault()}>
          Anchor that prevents default
        </a>
        <button>Button that will not close the menu</button>
      </div>
    </dialog>
  );
}
