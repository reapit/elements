import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { AvatarGroup } from "../avatar-group";
import { AvatarGroupItem } from "../avatar-group-item";
import { AvatarGroupContext } from "../context";

test("renders its children in a list", () => {
  render(
    <AvatarGroup>
      <AvatarGroupItem>AB</AvatarGroupItem>
    </AvatarGroup>,
  );
  const list = screen.getByRole("list");

  expect(list).toBeVisible();
  expect(list).toHaveTextContent("AB");
});

test("renders all of its children without limiting how many are shown", () => {
  render(
    <AvatarGroup>
      <AvatarGroupItem key="1">AB</AvatarGroupItem>
      <AvatarGroupItem key="2">CD</AvatarGroupItem>
      <AvatarGroupItem key="3">EF</AvatarGroupItem>
    </AvatarGroup>,
  );
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

test("provides context to child avatars, always defaulting borderColour to white", () => {
  expect.assertions(1);
  render(
    <AvatarGroup colour="primary" shape="square" size="lg">
      <AvatarGroupContext.Consumer>
        {(context) => {
          expect(context).toMatchInlineSnapshot(`
            {
              "borderColour": "--colour-border-white",
              "colour": "primary",
              "shape": "square",
              "size": "lg",
            }
          `);
          return null;
        }}
      </AvatarGroupContext.Consumer>
    </AvatarGroup>,
  );
});

test("forwards additional props to the list element", () => {
  render(
    <AvatarGroup data-testid="test-id">
      <AvatarGroupItem>AB</AvatarGroupItem>
    </AvatarGroup>,
  );
  expect(screen.getByTestId("test-id")).toBeVisible();
  expect(screen.getByTestId("test-id")).toBe(screen.getByRole("list"));
});
