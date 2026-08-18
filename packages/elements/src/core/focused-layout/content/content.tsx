import type { HTMLAttributes, ReactElement } from "react";

import { ElFocusedLayoutContent } from "./styles";

export namespace FocusedLayoutContent {
  export interface Props extends HTMLAttributes<HTMLElement> {
    /** Removes the content area's maximum width and padding. Use when nesting a `MainContainer`, which applies its own. */
    isFullBleed?: true;
  }

  /**
   * @deprecated The default padding and maximum width will be removed in the next major version.
   * Nest a `MainContainer` inside `FocusedLayout.Content` and pass `isFullBleed`
   * to adopt the future default now.
   */
  export interface DeprecatedProps extends HTMLAttributes<HTMLElement> {
    /** Removes the content area's maximum width and padding. Use when nesting a `MainContainer`, which applies its own. */
    isFullBleed?: never;
  }
}

/**
 * @deprecated The default padding and maximum width will be removed in the next major version.
 * Nest a `MainContainer` inside `FocusedLayout.Content` and pass `isFullBleed`
 * to adopt the future default now.
 */
export function FocusedLayoutContent(props: FocusedLayoutContent.DeprecatedProps): ReactElement;
/**
 * The main content region of a FocusedLayout. This is where the primary page content is placed.
 * The content area has responsive padding and a maximum width of 1200px by default; pass
 * `isFullBleed` to remove both, such as when nesting a `MainContainer`.
 */
export function FocusedLayoutContent(props: FocusedLayoutContent.Props): ReactElement;
export function FocusedLayoutContent({
  isFullBleed,
  ...rest
}: FocusedLayoutContent.Props | FocusedLayoutContent.DeprecatedProps) {
  return <ElFocusedLayoutContent {...rest} data-is-full-bleed={isFullBleed || undefined} />;
}

FocusedLayoutContent.displayName = "FocusedLayout.Content";
