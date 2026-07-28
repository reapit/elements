import { cx } from "@linaria/core";
import type { HTMLAttributes } from "react";

import { DescriptionListContext, useDescriptionListContext } from "./context";
import { DescriptionListItem } from "./item";
import { elDescriptionList } from "./styles";

export namespace DescriptionList {
  export interface ItemProps extends DescriptionListItem.Props {}

  export interface Props extends HTMLAttributes<HTMLDListElement> {
    /** CSS `gap` value to define the gap between grid items. */
    gap?: string;
    /**
     * CSS `grid` value to define the grid layout. When not provided, items will stack vertically.
     * Required for tabular layout.
     */
    grid?: string;
    /** The layout variant for description list items. */
    layout?: "stacked" | "tabular" | "inline";
    /** The size of the description list items. */
    size?: "base" | "sm";
  }
}

/**
 * A container for description list items that uses CSS Grid for layout.
 */
export function DescriptionList({
  children,
  className,
  gap,
  grid,
  layout,
  size,
  style,
  ...rest
}: DescriptionList.Props) {
  const contextValue: DescriptionListContext.Value = {
    layout,
    size,
  };

  return (
    <DescriptionListContext.Provider value={contextValue}>
      <dl
        {...rest}
        className={cx(elDescriptionList, className)}
        style={{
          ...style,
          ...(gap && { gap }),
          ...(grid && { grid }),
        }}
      >
        {children}
      </dl>
    </DescriptionListContext.Provider>
  );
}

DescriptionList.displayName = "DescriptionList";

DescriptionList.Item = DescriptionListItem;

DescriptionList.Context = DescriptionListContext;
DescriptionList.useContext = useDescriptionListContext;
