import type { HTMLAttributes, ReactNode } from "react";

import { SecondaryTabsItem } from "./secondary-tabs-item";
import { ElSecondaryTabs, ElSecondaryTabsList } from "./styles";

export namespace SecondaryTabs {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * The tab items for secondary navigation. Typically a collection of `SecondaryTabs.Item` components.
     */
    children: ReactNode;
    /**
     * Ideally, overflow is avoided as much as possible. When it can't be avoided (e.g. small screens),
     * use horizontal scrolling by providing `overflow="scroll"`. By default, overflow will be visible
     * without scrolling.
     */
    overflow?: "scroll" | "visible";
  }
}

/**
 * A navigation container for secondary tabs. Typically used with `SecondaryTabs.Item`.
 */
export function SecondaryTabs({ children, overflow = "visible", ...rest }: SecondaryTabs.Props) {
  return (
    <ElSecondaryTabs data-overflow={overflow} {...rest}>
      <ElSecondaryTabsList>{children}</ElSecondaryTabsList>
    </ElSecondaryTabs>
  );
}

SecondaryTabs.Item = SecondaryTabsItem;
