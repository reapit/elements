import { fireEvent, render, screen } from "@testing-library/react";

import { TopBarMenuDrawer } from "../../menu-drawer";
import { TopBarMenuDrawerHeaderCloseButton } from "../close-button";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <TopBarMenuDrawer isOpen>{children}</TopBarMenuDrawer>;
}

test("renders a button element", () => {
  render(<TopBarMenuDrawerHeaderCloseButton />, { wrapper: Wrapper });
  expect(screen.getByRole("button", { name: "Close menu" })).toBeVisible();
});

test("has accessible label", () => {
  render(<TopBarMenuDrawerHeaderCloseButton />, { wrapper: Wrapper });
  expect(screen.getByLabelText("Close menu")).toBeVisible();
});

test("renders CloseIcon", () => {
  const { container } = render(<TopBarMenuDrawerHeaderCloseButton />, { wrapper: Wrapper });
  const svg = container.querySelector("svg");
  expect(svg).toBeInTheDocument();
});

test("closes parent dialog when clicked", () => {
  const handleClose = vi.fn();
  render(
    <TopBarMenuDrawer isOpen onClose={handleClose}>
      <TopBarMenuDrawerHeaderCloseButton />
    </TopBarMenuDrawer>,
  );

  fireEvent.click(screen.getByRole("button", { name: "Close menu" }));

  expect(handleClose).toHaveBeenCalledTimes(1);
});

test("calls custom onClick handler", () => {
  const handleClick = vi.fn();
  render(<TopBarMenuDrawerHeaderCloseButton onClick={handleClick} />, { wrapper: Wrapper });

  fireEvent.click(screen.getByRole("button", { name: "Close menu" }));

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("uses tertiary variant", () => {
  render(<TopBarMenuDrawerHeaderCloseButton />, { wrapper: Wrapper });
  expect(screen.getByRole("button")).toHaveAttribute("data-variant", "tertiary");
});

test("uses button type", () => {
  render(<TopBarMenuDrawerHeaderCloseButton />, { wrapper: Wrapper });
  expect(screen.getByRole("button")).toHaveAttribute("type", "button");
});

test("uses large size", () => {
  render(<TopBarMenuDrawerHeaderCloseButton />, { wrapper: Wrapper });
  expect(screen.getByRole("button")).toHaveAttribute("data-size", "large");
});

test("forwards additional props to button", () => {
  render(<TopBarMenuDrawerHeaderCloseButton data-testid="close-btn" />, { wrapper: Wrapper });
  expect(screen.getByTestId("close-btn")).toBeVisible();
});
