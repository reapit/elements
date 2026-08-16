import { fireEvent, render, screen } from "@testing-library/react";

import { PrimaryTab } from "../tab";

test("renders a link element", () => {
  render(
    <PrimaryTab aria-current={false} href="/">
      Tab item
    </PrimaryTab>,
  );
  expect(screen.getByRole("link", { name: "Tab item" })).toBeVisible();
});

test("has the specified `aria-current` attribute", () => {
  render(
    <PrimaryTab aria-current="page" href="/">
      Tab item
    </PrimaryTab>,
  );
  expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
});

test("passes through additional props to the link element", () => {
  render(
    <PrimaryTab aria-current="page" data-testid="custom-tab" href="/">
      Tab item
    </PrimaryTab>,
  );
  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("data-testid", "custom-tab");
});

test("renders the icon when provided, hidden from assistive technology", () => {
  render(
    <PrimaryTab aria-current={false} href="/" icon={<svg data-testid="icon" />}>
      Tab item
    </PrimaryTab>,
  );
  const icon = screen.getByTestId("icon");
  expect(icon).toBeVisible();
  expect(icon.closest("[aria-hidden]")).not.toBeNull();
});

test("does not render an icon when not provided", () => {
  render(
    <PrimaryTab aria-current={false} href="/">
      Tab item
    </PrimaryTab>,
  );
  expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
});

test("renders the badge when provided", () => {
  render(
    <PrimaryTab aria-current={false} href="/" badge={<span data-testid="badge">14</span>}>
      Tab item
    </PrimaryTab>,
  );
  expect(screen.getByTestId("badge")).toBeVisible();
});

test("is not aria-disabled by default", () => {
  render(
    <PrimaryTab aria-current={false} href="/">
      Tab item
    </PrimaryTab>,
  );
  expect(screen.getByRole("link")).toHaveAttribute("aria-disabled", "false");
});

test("is aria-disabled when the aria-disabled prop is true", () => {
  render(
    <PrimaryTab aria-current={false} aria-disabled href="/">
      Tab item
    </PrimaryTab>,
  );
  expect(screen.getByRole("link")).toHaveAttribute("aria-disabled", "true");
});

describe("when aria-disabled", () => {
  test("does not call the consumer-supplied onClick handler", () => {
    const onClick = vi.fn();
    render(
      <PrimaryTab aria-current={false} aria-disabled href="/" onClick={onClick}>
        Tab item
      </PrimaryTab>,
    );
    fireEvent.click(screen.getByRole("link"));
    expect(onClick).not.toHaveBeenCalled();
  });

  test("prevents the event's default action", () => {
    const preventDefaultSpy = vi.spyOn(Event.prototype, "preventDefault");
    render(
      <PrimaryTab aria-current={false} aria-disabled href="/">
        Tab item
      </PrimaryTab>,
    );
    fireEvent.click(screen.getByRole("link"));
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
