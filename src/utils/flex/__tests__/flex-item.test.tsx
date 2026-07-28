import { render, screen } from "@testing-library/react";

import { FlexItem } from "../flex-item";
import { elFlexItem } from "../styles";

test("renders a div element by default", () => {
  render(<FlexItem data-testid="item">Content</FlexItem>);
  expect(screen.getByTestId("item").tagName).toBe("DIV");
});

test("renders the element named in `as`", () => {
  render(
    <FlexItem as="li" data-testid="item">
      Content
    </FlexItem>,
  );
  expect(screen.getByTestId("item").tagName).toBe("LI");
});

test("applies the base class", () => {
  render(<FlexItem data-testid="item">Content</FlexItem>);
  expect(screen.getByTestId("item")).toHaveClass(elFlexItem);
});

test("applies additional className alongside the base class", () => {
  render(
    <FlexItem className="custom" data-testid="item">
      Content
    </FlexItem>,
  );
  const el = screen.getByTestId("item");
  expect(el).toHaveClass(elFlexItem);
  expect(el).toHaveClass("custom");
});

test("merges caller style prop with component styles", () => {
  render(
    <FlexItem data-testid="item" flexGrow={1} style={{ color: "blue" }}>
      Content
    </FlexItem>,
  );
  const el = screen.getByTestId("item");
  expect(el).toHaveStyle({ color: "blue" });
  expect(el).toHaveStyle({ flexGrow: 1 });
});

test("applies flex shorthand as inline style", () => {
  render(
    <FlexItem data-testid="item" flex="1">
      Content
    </FlexItem>,
  );
  expect(screen.getByTestId("item")).toHaveStyle({ flex: "1" });
});

test("does not set flex inline style when flex is an empty string", () => {
  render(
    <FlexItem data-testid="item" flex="">
      Content
    </FlexItem>,
  );
  expect(screen.getByTestId("item").style.flex).toBe("");
});

test("applies flexGrow as inline style", () => {
  render(
    <FlexItem data-testid="item" flexGrow={2}>
      Content
    </FlexItem>,
  );
  expect(screen.getByTestId("item")).toHaveStyle({ flexGrow: 2 });
});

test("applies flexGrow={0} as inline style", () => {
  render(
    <FlexItem data-testid="item" flexGrow={0}>
      Content
    </FlexItem>,
  );
  expect(screen.getByTestId("item")).toHaveStyle({ flexGrow: 0 });
});

test("applies flexShrink as inline style", () => {
  render(
    <FlexItem data-testid="item" flexShrink={0}>
      Content
    </FlexItem>,
  );
  expect(screen.getByTestId("item")).toHaveStyle({ flexShrink: 0 });
});

test("applies flexBasis raw CSS value as inline style", () => {
  render(
    <FlexItem data-testid="item" flexBasis="200px">
      Content
    </FlexItem>,
  );
  expect(screen.getByTestId("item")).toHaveStyle({ flexBasis: "200px" });
});

test("expands flexBasis token to var() in inline style", () => {
  render(
    <FlexItem data-testid="item" flexBasis="--spacing-4">
      Content
    </FlexItem>,
  );
  expect(screen.getByTestId("item").style.flexBasis).toBe("var(--spacing-4)");
});

test("applies alignSelf as inline style", () => {
  render(
    <FlexItem alignSelf="flex-end" data-testid="item">
      Content
    </FlexItem>,
  );
  expect(screen.getByTestId("item")).toHaveStyle({ alignSelf: "flex-end" });
});

test("applies alignSelf auto as inline style", () => {
  render(
    <FlexItem alignSelf="auto" data-testid="item">
      Content
    </FlexItem>,
  );
  expect(screen.getByTestId("item")).toHaveStyle({ alignSelf: "auto" });
});

test("applies order as inline style", () => {
  render(
    <FlexItem data-testid="item" order={3}>
      Content
    </FlexItem>,
  );
  expect(screen.getByTestId("item")).toHaveStyle({ order: 3 });
});

test("applies order={0} as inline style", () => {
  render(
    <FlexItem data-testid="item" order={0}>
      Content
    </FlexItem>,
  );
  expect(screen.getByTestId("item")).toHaveStyle({ order: 0 });
});

test("does not set inline styles for unset props", () => {
  render(<FlexItem data-testid="item">Content</FlexItem>);
  const el = screen.getByTestId("item");
  expect(el.style.flex).toBe("");
  expect(el.style.flexGrow).toBe("");
});

test("forwards extra HTML attributes", () => {
  render(
    <FlexItem aria-label="flex item" data-testid="item">
      Content
    </FlexItem>,
  );
  expect(screen.getByTestId("item")).toHaveAttribute("aria-label", "flex item");
});
