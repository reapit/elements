import { cx } from "@linaria/core";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import { AtAGlanceGridItem } from "./grid-item";
import { elAtAGlanceGrid } from "./styles";

export namespace AtAGlanceGrid {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * Width of implicitly created grid columns. Applies only when `layout="auto"`.
     * Accepts any valid [grid-auto-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-auto-columns) value.
     */
    autoColumns?: string;
    /** The cards to display in the grid. */
    children: ReactNode;
    /**
     * The gap between the grid's rows and columns. Defaults to `--spacing-4`.
     */
    gap?: `--spacing-${string}`;
    /**
     * Number and size of explicitly created grid columns. Applies only when `layout="template"`.
     * Accepts any valid [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns) value.
     * @default '1fr 1fr 1fr 1fr 1fr'
     */
    templateColumns?: string;
    /**
     * Layout mode for the grid. Use `"auto"` with `autoColumns` for implicit column sizing,
     * or `"template"` (default) with `templateColumns` for explicit sizing.
     * @default 'template'
     */
    layout?: "auto" | "template";
  }
}

/**
 * A grid container for at-a-glance cards. Access this component via `AtAGlance.Grid`.
 * Renders as a `<ul>` element, so wrap each card in `AtAGlance.GridItem` (which renders as `<li>`).
 */
export function AtAGlanceGrid({
  autoColumns,
  children,
  className,
  gap = "--spacing-4",
  templateColumns = "1fr 1fr 1fr 1fr 1fr",
  layout = "template",
  role,
  style,
  ...rest
}: AtAGlanceGrid.Props) {
  // Render a <div> when a custom role is provided and a <ul> otherwise.
  // Ensures usage with Listbox (which passes role="listbox") results in a <div>
  const Element = role ? "div" : "ul";

  const gridStyles = {
    ...(layout === "auto" && autoColumns ? { gridAutoColumns: autoColumns } : {}),
    ...(layout === "template" && templateColumns ? { gridTemplateColumns: templateColumns } : {}),
    "--aag-grid-gap": `var(${gap})`,
  } as const satisfies CSSProperties & { "--aag-grid-gap": string };

  return (
    <Element
      {...rest}
      className={cx(className, elAtAGlanceGrid)}
      data-layout={layout}
      role={role}
      style={{ ...style, ...gridStyles }}
    >
      {children}
    </Element>
  );
}

AtAGlanceGrid.displayName = "AtAGlance.Grid";
AtAGlanceGrid.Item = AtAGlanceGridItem;
