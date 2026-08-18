import { cx } from "@linaria/core";
import type { HTMLAttributes, ReactNode } from "react";

import { elTableHeaderRow } from "./styles";

export namespace TableHeaderRow {
  interface AsTrProps extends HTMLAttributes<HTMLTableRowElement> {
    as?: "tr";
    /** The row's cells. */
    children: ReactNode;
  }

  interface AsDivProps extends HTMLAttributes<HTMLDivElement> {
    as: "div";
    /** The row's cells. */
    children: ReactNode;
  }

  export type Props = AsTrProps | AsDivProps;
}

/**
 * A table's header row. Does little more than render its children in a `<tr>` or `<div>` element.
 * Descendants will flow to new columns while rows will align to the table's grid using
 * [subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid).
 * Typically used via `Table.HeaderRow`.
 */
export function TableHeaderRow({
  as: Element = "tr",
  children,
  className,
  ...rest
}: TableHeaderRow.Props) {
  return (
    <Element {...rest} className={cx(elTableHeaderRow, className)}>
      {children}
    </Element>
  );
}

TableHeaderRow.displayName = "Table.HeaderRow";

// Backward compatibility
export type TableHeaderRowProps = TableHeaderRow.Props;
