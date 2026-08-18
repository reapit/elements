import { render, screen } from "@testing-library/react";

import { Flex } from "../flex";
import { FlexItem } from "../flex-item";
import { elFlex } from "../styles";

test("renders a div element by default", () => {
  render(<Flex data-testid="flex">Content</Flex>);
  expect(screen.getByTestId("flex").tagName).toBe("DIV");
});

test("renders the element named in `as`", () => {
  render(
    <Flex as="section" data-testid="flex">
      Content
    </Flex>,
  );
  expect(screen.getByTestId("flex").tagName).toBe("SECTION");
});

test("applies the base flex class", () => {
  render(<Flex data-testid="flex">Content</Flex>);
  expect(screen.getByTestId("flex")).toHaveClass(elFlex);
});

test("applies additional className alongside the base class", () => {
  render(
    <Flex className="custom" data-testid="flex">
      Content
    </Flex>,
  );
  const el = screen.getByTestId("flex");
  expect(el).toHaveClass(elFlex);
  expect(el).toHaveClass("custom");
});

test("merges caller style prop with component styles", () => {
  render(
    <Flex data-testid="flex" direction="column" style={{ color: "red" }}>
      Content
    </Flex>,
  );
  const el = screen.getByTestId("flex");
  expect(el).toHaveStyle({ color: "red" });
  expect(el).toHaveStyle({ flexDirection: "column" });
});

test("caller style prop overrides component styles", () => {
  render(
    <Flex data-testid="flex" direction="column" style={{ flexDirection: "row" }}>
      Content
    </Flex>,
  );
  expect(screen.getByTestId("flex")).toHaveStyle({ flexDirection: "row" });
});

test("applies direction as inline style", () => {
  render(
    <Flex data-testid="flex" direction="column">
      Content
    </Flex>,
  );
  expect(screen.getByTestId("flex")).toHaveStyle({ flexDirection: "column" });
});

test("applies wrap as inline style", () => {
  render(
    <Flex data-testid="flex" wrap="wrap">
      Content
    </Flex>,
  );
  expect(screen.getByTestId("flex")).toHaveStyle({ flexWrap: "wrap" });
});

test("applies gap token to both column-gap and row-gap as inline styles", () => {
  render(
    <Flex data-testid="flex" gap="--spacing-2">
      Content
    </Flex>,
  );
  const el = screen.getByTestId("flex");
  expect(el.style.columnGap).toBe("var(--spacing-2)");
  expect(el.style.rowGap).toBe("var(--spacing-2)");
});

test("applies columnGap token as inline style", () => {
  render(
    <Flex data-testid="flex" columnGap="--spacing-3">
      Content
    </Flex>,
  );
  expect(screen.getByTestId("flex").style.columnGap).toBe("var(--spacing-3)");
});

test("applies rowGap token as inline style", () => {
  render(
    <Flex data-testid="flex" rowGap="--spacing-4">
      Content
    </Flex>,
  );
  expect(screen.getByTestId("flex").style.rowGap).toBe("var(--spacing-4)");
});

test("columnGap overrides gap for the column axis", () => {
  render(
    <Flex columnGap="--spacing-3" data-testid="flex" gap="--spacing-2">
      Content
    </Flex>,
  );
  const el = screen.getByTestId("flex");
  expect(el.style.columnGap).toBe("var(--spacing-3)");
  expect(el.style.rowGap).toBe("var(--spacing-2)");
});

test("applies alignItems as inline style", () => {
  render(
    <Flex alignItems="center" data-testid="flex">
      Content
    </Flex>,
  );
  expect(screen.getByTestId("flex")).toHaveStyle({ alignItems: "center" });
});

test("applies justifyContent as inline style", () => {
  render(
    <Flex data-testid="flex" justifyContent="space-between">
      Content
    </Flex>,
  );
  expect(screen.getByTestId("flex")).toHaveStyle({ justifyContent: "space-between" });
});

test("applies alignContent as inline style", () => {
  render(
    <Flex alignContent="flex-start" data-testid="flex">
      Content
    </Flex>,
  );
  expect(screen.getByTestId("flex")).toHaveStyle({ alignContent: "flex-start" });
});

test("applies inline-flex display when isInline is true", () => {
  render(
    <Flex data-testid="flex" isInline>
      Content
    </Flex>,
  );
  expect(screen.getByTestId("flex")).toHaveStyle({ display: "inline-flex" });
});

test("applies flex display when isInline is false", () => {
  render(
    <Flex data-testid="flex" isInline={false}>
      Content
    </Flex>,
  );
  expect(screen.getByTestId("flex")).toHaveStyle({ display: "flex" });
});

test("does not set inline styles for unset props", () => {
  render(<Flex data-testid="flex">Content</Flex>);
  const el = screen.getByTestId("flex");
  expect(el.style.flexDirection).toBe("");
  expect(el.style.columnGap).toBe("");
});

test("forwards extra HTML attributes", () => {
  render(
    <Flex aria-label="flex container" data-testid="flex">
      Content
    </Flex>,
  );
  expect(screen.getByTestId("flex")).toHaveAttribute("aria-label", "flex container");
});

test("Flex.Item is accessible as a static property", () => {
  expect(Flex.Item).toBe(FlexItem);
});
