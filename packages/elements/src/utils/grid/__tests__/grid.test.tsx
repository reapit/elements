import { render, screen } from "@testing-library/react";

import { Grid } from "../grid";

test("renders a div element by default", () => {
  render(<Grid data-testid="grid">Content</Grid>);
  expect(screen.getByTestId("grid").tagName).toBe("DIV");
});

test("renders the element specified by as", () => {
  render(
    <Grid as="section" data-testid="grid">
      Content
    </Grid>,
  );
  expect(screen.getByTestId("grid").tagName).toBe("SECTION");
});

test("displays children", () => {
  render(<Grid>Content</Grid>);
  expect(screen.getByText("Content")).toBeVisible();
});

test("applies templateColumns as inline style", () => {
  render(
    <Grid data-testid="grid" templateColumns="1fr 1fr 1fr">
      Content
    </Grid>,
  );
  expect(screen.getByTestId("grid")).toHaveStyle({ gridTemplateColumns: "1fr 1fr 1fr" });
});

test("applies templateRows as inline style", () => {
  render(
    <Grid data-testid="grid" templateRows="auto 1fr">
      Content
    </Grid>,
  );
  expect(screen.getByTestId("grid")).toHaveStyle({ gridTemplateRows: "auto 1fr" });
});

test("applies templateAreas as inline style", () => {
  render(
    <Grid data-testid="grid" templateAreas='"header" "main"'>
      Content
    </Grid>,
  );
  expect(screen.getByTestId("grid")).toHaveStyle({ gridTemplateAreas: '"header" "main"' });
});

test("applies autoColumns as inline style", () => {
  render(
    <Grid data-testid="grid" autoColumns="minmax(100px, 1fr)">
      Content
    </Grid>,
  );
  expect(screen.getByTestId("grid")).toHaveStyle({ gridAutoColumns: "minmax(100px, 1fr)" });
});

test("applies autoRows as inline style", () => {
  render(
    <Grid data-testid="grid" autoRows="100px">
      Content
    </Grid>,
  );
  expect(screen.getByTestId("grid")).toHaveStyle({ gridAutoRows: "100px" });
});

test("applies autoFlow as inline style", () => {
  render(
    <Grid data-testid="grid" autoFlow="column">
      Content
    </Grid>,
  );
  expect(screen.getByTestId("grid")).toHaveStyle({ gridAutoFlow: "column" });
});

test("applies gap token as inline style", () => {
  render(
    <Grid data-testid="grid" gap="--spacing-4">
      Content
    </Grid>,
  );
  expect(screen.getByTestId("grid").style.gap).toBe("var(--spacing-4)");
});

test("applies columnGap token as inline style", () => {
  render(
    <Grid data-testid="grid" columnGap="--spacing-8">
      Content
    </Grid>,
  );
  expect(screen.getByTestId("grid").style.columnGap).toBe("var(--spacing-8)");
});

test("applies rowGap token as inline style", () => {
  render(
    <Grid data-testid="grid" rowGap="--spacing-2">
      Content
    </Grid>,
  );
  expect(screen.getByTestId("grid").style.rowGap).toBe("var(--spacing-2)");
});

test("applies alignItems as inline style", () => {
  render(
    <Grid data-testid="grid" alignItems="center">
      Content
    </Grid>,
  );
  expect(screen.getByTestId("grid")).toHaveStyle({ alignItems: "center" });
});

test("applies justifyItems as inline style", () => {
  render(
    <Grid data-testid="grid" justifyItems="end">
      Content
    </Grid>,
  );
  expect(screen.getByTestId("grid")).toHaveStyle({ justifyItems: "end" });
});

test("applies alignContent as inline style", () => {
  render(
    <Grid data-testid="grid" alignContent="space-between">
      Content
    </Grid>,
  );
  expect(screen.getByTestId("grid")).toHaveStyle({ alignContent: "space-between" });
});

test("applies justifyContent as inline style", () => {
  render(
    <Grid data-testid="grid" justifyContent="space-around">
      Content
    </Grid>,
  );
  expect(screen.getByTestId("grid")).toHaveStyle({ justifyContent: "space-around" });
});

test("applies inline-grid display when isInline is true", () => {
  render(
    <Grid data-testid="grid" isInline>
      Content
    </Grid>,
  );
  expect(screen.getByTestId("grid")).toHaveStyle({ display: "inline-grid" });
});

test("applies grid display when isInline is false", () => {
  render(
    <Grid data-testid="grid" isInline={false}>
      Content
    </Grid>,
  );
  expect(screen.getByTestId("grid")).toHaveStyle({ display: "grid" });
});

test("does not set display inline style when isInline is not provided", () => {
  render(<Grid data-testid="grid">Content</Grid>);
  expect(screen.getByTestId("grid").style.display).toBe("");
});

test("forwards extra HTML attributes", () => {
  render(
    <Grid aria-label="layout grid" data-testid="grid">
      Content
    </Grid>,
  );
  expect(screen.getByTestId("grid")).toHaveAttribute("aria-label", "layout grid");
});

test("applies additional className alongside the base class", () => {
  render(
    <Grid className="custom-class" data-testid="grid">
      Content
    </Grid>,
  );
  expect(screen.getByTestId("grid")).toHaveClass("custom-class");
});

test("merges caller style prop with inline styles", () => {
  render(
    <Grid data-testid="grid" style={{ color: "red" }} templateColumns="1fr 1fr">
      Content
    </Grid>,
  );
  expect(screen.getByTestId("grid")).toHaveStyle({ color: "red", gridTemplateColumns: "1fr 1fr" });
});

test("does not apply inline styles for unset props", () => {
  render(<Grid data-testid="grid">Content</Grid>);
  const grid = screen.getByTestId("grid");
  expect(grid.style.gridTemplateColumns).toBe("");
  expect(grid.style.gap).toBe("");
});

test("exposes Grid.Item", () => {
  expect(Grid.Item).toBeDefined();
});
