import preview from "#.storybook/preview";

import { Grid } from "./grid";

const itemStyle = {
  background: "var(--colour-fill-action-light)",
  borderRadius: "var(--border-radius-m)",
  padding: "var(--spacing-2)",
};

const meta = preview.meta({
  title: "Utils/Grid",
  component: Grid,
  argTypes: {
    isInline: { control: "boolean" },
    templateColumns: { control: "text" },
    templateRows: { control: "text" },
    templateAreas: { control: "text" },
    autoColumns: { control: "text" },
    autoRows: { control: "text" },
    autoFlow: {
      control: "radio",
      options: ["row", "column", "row dense", "column dense"],
    },
    gap: { control: "text" },
    columnGap: { control: "text" },
    rowGap: { control: "text" },
    alignItems: {
      control: "select",
      options: ["normal", "start", "end", "center", "stretch", "baseline"],
    },
    justifyItems: {
      control: "radio",
      options: ["normal", "start", "end", "center", "stretch"],
    },
    alignContent: {
      control: "select",
      options: [
        "start",
        "end",
        "center",
        "stretch",
        "space-between",
        "space-around",
        "space-evenly",
      ],
    },
    justifyContent: {
      control: "select",
      options: [
        "start",
        "end",
        "center",
        "stretch",
        "space-between",
        "space-around",
        "space-evenly",
      ],
    },
  },
  parameters: {
    layout: "padded",
  },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <Grid.Item key={i} style={itemStyle}>
          {i + 1}
        </Grid.Item>
      ))}
    </Grid>
  ),
});

/**
 * By default, the grid renders a `<div>` container with `display: grid`. Use `templateColumns`
 * to define the column structure.
 */
export const Example = meta.story({
  args: {
    templateColumns: "1fr 1fr 1fr",
    gap: "--spacing-4",
  },
});

/**
 * Use `gap`, `columnGap`, and `rowGap` with a spacing token to control gutters between items.
 */
export const Gap = Example.extend({
  args: {
    columnGap: "--spacing-8",
    rowGap: "--spacing-2",
    gap: undefined,
  },
});

/**
 * Use `templateAreas`, `templateColumns`, and `templateRows` to build named-area layouts such as
 * a classic page scaffold. For a production-ready implementation of this pattern, use `PageLayout`.
 */
export const Areas = meta.story({
  render: () => (
    <Grid
      templateAreas='"header header" "sidebar main" "footer footer"'
      templateColumns="200px 1fr"
      templateRows="auto 1fr auto"
      gap="--spacing-4"
      style={{ minHeight: "300px" }}
    >
      <Grid.Item area="header" style={itemStyle}>
        Header
      </Grid.Item>
      <Grid.Item area="sidebar" style={itemStyle}>
        Sidebar
      </Grid.Item>
      <Grid.Item area="main" style={itemStyle}>
        Main
      </Grid.Item>
      <Grid.Item area="footer" style={itemStyle}>
        Footer
      </Grid.Item>
    </Grid>
  ),
});

/**
 * Use `autoColumns` with `autoFlow="column"` to arrange items in a single horizontal row,
 * letting the grid create columns implicitly.
 */
export const AutoFlow = meta.story({
  args: {
    autoColumns: "minmax(120px, 1fr)",
    autoFlow: "column",
    gap: "--spacing-4",
  },
});

/**
 * Use `column` and `row` on `Grid.Item` to control item placement and spanning.
 * Both props accept any valid CSS `grid-column` / `grid-row` value,
 * e.g. `"1 / 3"`, `"span 2"`, `"1 / -1"`.
 */
export const Placement = meta.story({
  render: () => (
    <Grid templateColumns="repeat(3, 1fr)" gap="--spacing-4">
      <Grid.Item column="1 / 3" style={itemStyle}>
        Spans 2 columns
      </Grid.Item>
      <Grid.Item style={itemStyle}>3</Grid.Item>
      <Grid.Item style={itemStyle}>4</Grid.Item>
      <Grid.Item column="2 / 4" style={itemStyle}>
        Spans columns 2–3
      </Grid.Item>
    </Grid>
  ),
});

/**
 * Both `Grid` and `Grid.Item` accept an `as` prop to render as any HTML element. Here the
 * container renders as a `<ul>` and each item as a `<li>`.
 */
export const Polymorphism = meta.story({
  render: () => (
    <Grid
      as="ul"
      templateColumns="1fr 1fr 1fr"
      gap="--spacing-4"
      style={{ listStyle: "none", padding: 0, margin: 0 }}
    >
      {Array.from({ length: 3 }, (_, i) => (
        <Grid.Item key={i} as="li" style={itemStyle}>
          {i + 1}
        </Grid.Item>
      ))}
    </Grid>
  ),
});
