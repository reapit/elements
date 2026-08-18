import type { HTMLAttributes, ReactNode } from "react";

import { PrimaryTabsItem } from "./primary-tabs-item";
import { ElPrimaryTabs, ElPrimaryTabsList } from "./styles";

export namespace PrimaryTabs {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /**
     * The tab items for primary navigation. Typically a collection of `PrimaryTabs.Item` components.
     */
    children: ReactNode;
    /**
     * Controls how tabs are laid out along the main axis. `start` (the default) sizes each tab to its
     * content. `stretch` grows tabs so they equally fill the available width.
     */
    justifyContent?: "start" | "stretch";
    /**
     * Ideally, overflow is avoided as much as possible. When it can't be avoided (e.g. small screens),
     * use horizontal scrolling by providing `overflow="scroll"`. By default, overflow will be visible
     * without scrolling.
     */
    overflow?: "scroll" | "visible";
  }
}

/**
 * A navigation container for primary tabs. Typically used with `PrimaryTabs.Item`.
 */
export function PrimaryTabs({
  children,
  justifyContent = "start",
  overflow = "visible",
  ...rest
}: PrimaryTabs.Props) {
  return (
    <ElPrimaryTabs data-overflow={overflow} {...rest}>
      <ElPrimaryTabsList data-justify-content={justifyContent}>{children}</ElPrimaryTabsList>
    </ElPrimaryTabs>
  );
}

PrimaryTabs.Item = PrimaryTabsItem;
