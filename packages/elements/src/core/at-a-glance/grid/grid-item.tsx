import type { HTMLAttributes, ReactNode } from "react";

import { ElAtAGlanceGridItem } from "./styles";

export namespace AtAGlanceGridItem {
  export interface Props extends HTMLAttributes<HTMLLIElement> {
    /** The card to display in the grid item. */
    children: ReactNode;
  }
}

/**
 * Wraps a card in a list item container for use within `AtAGlance.Grid`.
 * Provides proper list semantics when cards are displayed in a grid layout.
 *
 * @example
 * ```tsx
 * <AtAGlance.Grid>
 *   <AtAGlance.GridItem>
 *     <AtAGlance.Card label="Sales" value="$12k" />
 *   </AtAGlance.GridItem>
 *   <AtAGlance.GridItem>
 *     <AtAGlance.LinkCard href="/sales" label="Details" value="View" />
 *   </AtAGlance.GridItem>
 * </AtAGlance.Grid>
 * ```
 */
export function AtAGlanceGridItem({ children, ...rest }: AtAGlanceGridItem.Props) {
  return <ElAtAGlanceGridItem {...rest}>{children}</ElAtAGlanceGridItem>;
}

AtAGlanceGridItem.displayName = "AtAGlance.GridItem";
