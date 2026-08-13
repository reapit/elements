import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { AvatarGroup } from "../avatar-group";
import { AvatarGroupOverflowItem } from "../avatar-group-overflow-item";

test("renders a `+N` avatar with a list item ancestor", () => {
  render(
    <AvatarGroup>
      <AvatarGroupOverflowItem count={3} />
    </AvatarGroup>,
  );
  const avatar = screen.getByText("+3");
  const listItem = screen.getByRole("listitem");

  expect(avatar).toBeVisible();
  expect(listItem).toBeVisible();
  expect(avatar.parentElement).toBe(listItem);
});

test("renders nothing when count is 0 or less", () => {
  render(
    <AvatarGroup>
      <AvatarGroupOverflowItem count={0} />
    </AvatarGroup>,
  );
  expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
});

test("defaults to `primary` colour, unlike other items in the group", () => {
  render(
    <AvatarGroup colour="default">
      <AvatarGroupOverflowItem count={2} />
    </AvatarGroup>,
  );
  expect(screen.getByText("+2")).toHaveAttribute("data-colour", "primary");
});

test("is pinned to the size set on the group, regardless of its own props", () => {
  render(
    <AvatarGroup size="lg">
      <AvatarGroupOverflowItem count={2} />
    </AvatarGroup>,
  );
  expect(screen.getByText("+2")).toHaveAttribute("data-size", "lg");
});

test("applies default shape from AvatarGroupContext, overridable per item", () => {
  render(
    <AvatarGroup shape="square">
      <AvatarGroupOverflowItem count={2} />
    </AvatarGroup>,
  );
  expect(screen.getByText("+2")).toHaveAttribute("data-shape", "square");
});

test("always renders with a white border, unlike other items it cannot override it", () => {
  render(
    <AvatarGroup>
      <AvatarGroupOverflowItem count={2} />
    </AvatarGroup>,
  );
  expect(screen.getByText("+2").style.borderColor).toBe("var(--colour-border-white)");
});

test("throws error when used outside AvatarGroup context", () => {
  const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => {
    render(<AvatarGroupOverflowItem count={2} />);
  }).toThrow("useAvatarGroupContext requires an AvatarGroup ancestor");

  consoleError.mockRestore();
});
