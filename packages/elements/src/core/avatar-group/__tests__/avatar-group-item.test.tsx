import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { AvatarGroup } from "../avatar-group";
import { AvatarGroupItem } from "../avatar-group-item";

test("renders an avatar with a list item ancestor", () => {
  render(
    <AvatarGroup>
      <AvatarGroupItem>AB</AvatarGroupItem>
    </AvatarGroup>,
  );
  const avatar = screen.getByText("AB");
  const listItem = screen.getByRole("listitem");

  expect(avatar).toBeVisible();
  expect(listItem).toBeVisible();
  expect(avatar.parentElement).toBe(listItem);
});

test("is pinned to the size set on the group, regardless of its own props", () => {
  render(
    <AvatarGroup size="lg">
      <AvatarGroupItem>AB</AvatarGroupItem>
    </AvatarGroup>,
  );
  expect(screen.getByText("AB")).toHaveAttribute("data-size", "lg");
});

test("applies default colour and shape from AvatarGroupContext, and defaults to a white border", () => {
  render(
    <AvatarGroup colour="primary" shape="square">
      <AvatarGroupItem>AB</AvatarGroupItem>
    </AvatarGroup>,
  );
  const avatar = screen.getByText("AB");

  expect(avatar).toHaveAttribute("data-colour", "primary");
  expect(avatar).toHaveAttribute("data-shape", "square");
  expect(avatar.style.borderColor).toBe("var(--colour-border-white)");
});

test("colour, shape, and border colour can be overridden per item", () => {
  render(
    <AvatarGroup colour="primary" shape="square">
      <AvatarGroupItem
        borderColour="--colour-border-action-default"
        colour="default"
        shape="circle"
      >
        AB
      </AvatarGroupItem>
    </AvatarGroup>,
  );
  const avatar = screen.getByText("AB");

  expect(avatar).toHaveAttribute("data-colour", "default");
  expect(avatar).toHaveAttribute("data-shape", "circle");
  expect(avatar.style.borderColor).toBe("var(--colour-border-action-default)");
});

test("throws error when used outside AvatarGroup context", () => {
  const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => {
    render(<AvatarGroupItem>AB</AvatarGroupItem>);
  }).toThrow("useAvatarGroupContext requires an AvatarGroup ancestor");

  consoleError.mockRestore();
});
