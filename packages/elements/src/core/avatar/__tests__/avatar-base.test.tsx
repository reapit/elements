import { fireEvent, render, screen } from "@testing-library/react";

import { BuildingIcon } from "#src/icons/building";
import { UserOutlineIcon } from "#src/icons/user-outline";

import { AvatarBase } from "../avatar-base";

test('renders as a span element when `as="span"`', () => {
  render(<AvatarBase as="span">AB</AvatarBase>);
  expect(screen.getByText("AB")).toBeVisible();
});

test('renders as a button element when `as="button"`', () => {
  render(
    <AvatarBase as="button" aria-label="Profile menu">
      AB
    </AvatarBase>,
  );
  expect(screen.getByRole("button", { name: "Profile menu" })).toBeVisible();
});

test('renders as a link element when `as="a"`', () => {
  render(
    <AvatarBase as="a" href="https://fake.url" aria-label="View profile">
      AB
    </AvatarBase>,
  );
  expect(screen.getByRole("link", { name: "View profile" })).toBeVisible();
});

test('has `role="presentation"` when rendered as a span', () => {
  render(<AvatarBase as="span">AB</AvatarBase>);
  expect(screen.getByRole("presentation")).toBeVisible();
});

test('does not have `role="presentation"` when rendered as a button', () => {
  render(
    <AvatarBase as="button" aria-label="Profile menu">
      AB
    </AvatarBase>,
  );
  expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
});

test("applies correct data-* attributes", () => {
  render(
    <AvatarBase
      as="span"
      colour="primary"
      shape="square"
      size="lg"
      borderColour="--colour-border-white"
    >
      AB
    </AvatarBase>,
  );
  const avatar = screen.getByText("AB");
  expect(avatar).toHaveAttribute("data-colour", "primary");
  expect(avatar).toHaveAttribute("data-shape", "square");
  expect(avatar).toHaveAttribute("data-size", "lg");
});

test("sets a border from the `borderColour` design token", () => {
  render(
    <AvatarBase as="span" borderColour="--colour-border-action-default">
      AB
    </AvatarBase>,
  );
  const avatar = screen.getByText("AB");
  expect(avatar.style.borderWidth).toBe("var(--border-width-double)");
  expect(avatar.style.borderStyle).toBe("solid");
  expect(avatar.style.borderColor).toBe("var(--colour-border-action-default)");
  expect(avatar.style.boxSizing).toBe("content-box");
});

test("does not set a border when `borderColour` is unset", () => {
  render(<AvatarBase as="span">AB</AvatarBase>);
  const avatar = screen.getByText("AB");
  expect(avatar.style.borderWidth).toBe("");
  expect(avatar.style.borderStyle).toBe("");
  expect(avatar.style.borderColor).toBe("");
  expect(avatar.style.boxSizing).toBe("");
});

test("renders an image when `src` is provided and has not errored", () => {
  render(<AvatarBase as="span" src="https://example.com/avatar.png" alt="A user" />);
  expect(screen.getByRole("img", { name: "A user" })).toBeVisible();
});

test("falls back to children when the image errors", () => {
  render(
    <AvatarBase as="span" src="https://example.com/broken.png" alt="A user">
      AB
    </AvatarBase>,
  );
  fireEvent.error(screen.getByRole("img"));
  expect(screen.getByText("AB")).toBeVisible();
});

test("renders a `user-outline` fallback icon when circular with no `src` or `children`", () => {
  const { container: expected } = render(<UserOutlineIcon />);
  render(<AvatarBase as="span" shape="circle" />);
  expect(screen.getByRole("presentation").querySelector("svg")?.outerHTML).toBe(
    expected.querySelector("svg")?.outerHTML,
  );
});

test("renders a `building` fallback icon when square with no `src` or `children`", () => {
  const { container: expected } = render(<BuildingIcon />);
  render(<AvatarBase as="span" shape="square" />);
  expect(screen.getByRole("presentation").querySelector("svg")?.outerHTML).toBe(
    expected.querySelector("svg")?.outerHTML,
  );
});

test("renders the fallback icon when the image errors and no `children` is provided", () => {
  render(<AvatarBase as="span" src="https://example.com/broken.png" alt="A user" />);
  fireEvent.error(screen.getByRole("img"));
  expect(screen.getByRole("presentation").querySelector("svg")).toBeInTheDocument();
});

test("does not render the fallback icon when `children` is provided", () => {
  render(<AvatarBase as="span">AB</AvatarBase>);
  expect(screen.getByRole("presentation").querySelector("svg")).not.toBeInTheDocument();
});

test("is ARIA disabled when `aria-disabled` is true", () => {
  render(
    <AvatarBase as="button" aria-disabled="true" aria-label="Profile menu">
      AB
    </AvatarBase>,
  );
  expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
});

test("is ARIA disabled when `disabled` is true", () => {
  render(
    <AvatarBase as="button" disabled aria-label="Profile menu">
      AB
    </AvatarBase>,
  );
  expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
});

test("does not have `aria-disabled` when rendered as a span", () => {
  render(<AvatarBase as="span">AB</AvatarBase>);
  expect(screen.getByText("AB")).not.toHaveAttribute("aria-disabled");
});

test("renders as a button and shows a tooltip when `aria-label` is provided to a span avatar", () => {
  render(
    <AvatarBase as="span" aria-label="Alex Doe">
      AD
    </AvatarBase>,
  );
  const avatar = screen.getByRole("button", { name: "Alex Doe" });
  expect(avatar).toBeVisible();
  expect(screen.getByText("Alex Doe")).toBeInTheDocument();
});

test("does not render a tooltip when a span avatar has no `aria-label`", () => {
  render(<AvatarBase as="span">AB</AvatarBase>);
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
});

test("does not mark a span-turned-button avatar as interactive", () => {
  render(
    <AvatarBase as="span" aria-label="Alex Doe">
      AD
    </AvatarBase>,
  );
  expect(screen.getByRole("button")).not.toHaveAttribute("data-interactive");
});

test("does not put `aria-disabled` on a span-turned-button avatar", () => {
  render(
    <AvatarBase as="span" aria-disabled="true" aria-label="Alex Doe">
      AD
    </AvatarBase>,
  );
  expect(screen.getByRole("button")).not.toHaveAttribute("aria-disabled");
});

test("marks a real interactive avatar rendered as a button as interactive", () => {
  render(
    <AvatarBase as="button" aria-label="Profile menu">
      AB
    </AvatarBase>,
  );
  expect(screen.getByRole("button")).toHaveAttribute("data-interactive", "true");
});

test("marks a real interactive avatar rendered as an anchor as interactive", () => {
  render(
    <AvatarBase as="a" aria-label="View profile" href="https://fake.url">
      AB
    </AvatarBase>,
  );
  expect(screen.getByRole("link")).toHaveAttribute("data-interactive", "true");
});

describe('when `aria-disabled="true"`', () => {
  test("does not call the consumer-supplied `onClick` handler", () => {
    const onClick = vi.fn();

    render(
      <AvatarBase as="button" aria-disabled="true" aria-label="Profile menu" onClick={onClick}>
        AB
      </AvatarBase>,
    );
    fireEvent.click(screen.getByRole("button"));

    expect(onClick).not.toHaveBeenCalled();
  });

  test("prevents the event's default action", () => {
    // NOTE: we have to spy on the `preventDefault` method on the `Event` prototype because our onClick handler
    // will not be called when `aria-disabled` is true.
    const preventDefaultSpy = vi.spyOn(Event.prototype, "preventDefault");

    render(
      <AvatarBase as="a" aria-disabled="true" aria-label="View profile" href="https://fake.url">
        AB
      </AvatarBase>,
    );
    fireEvent.click(screen.getByRole("link"));

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  test("stops the event's propagation", () => {
    const parentOnClick = vi.fn();

    render(
      <div onClick={parentOnClick}>
        <AvatarBase as="button" aria-disabled="true" aria-label="Profile menu">
          AB
        </AvatarBase>
      </div>,
    );
    fireEvent.click(screen.getByRole("button"));

    expect(parentOnClick).not.toHaveBeenCalled();
  });
});
