import { cx } from "@linaria/core";
import type { ComponentPropsWithoutRef, CSSProperties, ElementType } from "react";

import { elFlexItem } from "./styles";

export namespace FlexItem {
  export interface BaseProps {
    /**
     * Aligns the item along the cross axis, overriding the container's `align-items` value.
     */
    alignSelf?: "auto" | "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
    /**
     * The `flex` shorthand, controlling grow, shrink, and basis in one value (e.g. `'1'`, `'0 1 auto'`).
     */
    flex?: string;
    /**
     * The initial main size of the item before free space is distributed.
     * Accepts a raw CSS value (e.g. `'200px'`) or a spacing token name (e.g. `'--spacing-4'`).
     */
    flexBasis?: string;
    /**
     * How much the item grows relative to other items when there is free space.
     */
    flexGrow?: number;
    /**
     * How much the item shrinks relative to other items when there is insufficient space.
     */
    flexShrink?: number;
    /**
     * Controls the order in which the item appears within the flex container.
     */
    order?: number;
  }

  export type Props<C extends ElementType = "div"> = BaseProps &
    Omit<ComponentPropsWithoutRef<C>, keyof BaseProps> & {
      /**
       * The element to render as. Defaults to `div`.
       */
      as?: C;
    };
}

export function FlexItem<C extends ElementType = "div">({
  alignSelf,
  as,
  className,
  flex,
  flexBasis,
  flexGrow,
  flexShrink,
  order,
  style,
  ...rest
}: FlexItem.Props<C>) {
  const Element = (as ?? "div") as ElementType;

  const inlineStyles: CSSProperties = {
    ...(flex && { flex }),
    ...(flexBasis && {
      flexBasis: flexBasis.startsWith("--") ? `var(${flexBasis})` : flexBasis,
    }),
    ...(flexGrow !== undefined && { flexGrow }),
    ...(flexShrink !== undefined && { flexShrink }),
    ...(order !== undefined && { order }),
    ...(alignSelf && { alignSelf }),
  };

  return (
    <Element
      {...rest}
      className={cx(elFlexItem, className)}
      style={{ ...inlineStyles, ...style }}
    />
  );
}
