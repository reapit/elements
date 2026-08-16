import { fireEvent, render, screen } from "@testing-library/react";

import { Badge } from "#src/core/badge";

import { SecondaryTab } from "../tab";

test("renders a link element", () => {
  render(
    <SecondaryTab aria-current={false} href="/">
      Tab item
    </SecondaryTab>,
  );
  expect(screen.getByRole("link", { name: "Tab item" })).toBeVisible();
});

test("has the specified `aria-current` attribute", () => {
  render(
    <SecondaryTab aria-current="page" href="/">
      Tab item
    </SecondaryTab>,
  );
  expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
});

test("passes through additional props to the link element", () => {
  render(
    <SecondaryTab aria-current="page" data-testid="custom-tab" href="/">
      Tab item
    </SecondaryTab>,
  );
  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("data-testid", "custom-tab");
});

test("renders a badge when supplied", () => {
  render(
    <SecondaryTab aria-current={false} badge={<Badge colour="inactive">14</Badge>} href="/">
      Tab item
    </SecondaryTab>,
  );
  expect(screen.getByText("14")).toBeVisible();
});

test("has the specified `aria-disabled` attribute", () => {
  render(
    <SecondaryTab aria-current={false} aria-disabled href="/">
      Tab item
    </SecondaryTab>,
  );
  expect(screen.getByRole("link")).toHaveAttribute("aria-disabled", "true");
});

test("remains focusable while disabled", () => {
  render(
    <SecondaryTab aria-current={false} aria-disabled href="/">
      Tab item
    </SecondaryTab>,
  );
  expect(screen.getByRole("link")).not.toHaveAttribute("tabindex", "-1");
});

test("ARIA disabled tab does not call `onClick`", () => {
  const handleClick = vi.fn();
  render(
    <SecondaryTab aria-current={false} aria-disabled href="/" onClick={handleClick}>
      Tab item
    </SecondaryTab>,
  );

  fireEvent.click(screen.getByRole("link"));

  expect(handleClick).not.toHaveBeenCalled();
});

test("ARIA disabled tab prevents click events from propagating", () => {
  const parentClickHandler = vi.fn();
  render(
    <div onClick={parentClickHandler}>
      <SecondaryTab aria-current={false} aria-disabled href="/">
        Tab item
      </SecondaryTab>
    </div>,
  );

  fireEvent.click(screen.getByRole("link"));

  expect(parentClickHandler).not.toHaveBeenCalled();
});

test("calls `onClick` when not disabled", () => {
  const handleClick = vi.fn();
  render(
    <SecondaryTab aria-current={false} href="/" onClick={handleClick}>
      Tab item
    </SecondaryTab>,
  );

  fireEvent.click(screen.getByRole("link"));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
