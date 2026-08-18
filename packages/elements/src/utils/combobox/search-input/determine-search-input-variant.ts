import type { SearchInput } from "#src/core/search-input";

import type { ComboboxPopupDialogContext } from "../popup-dialog/context";

export namespace determineSearchInputVariant {
  /**
   * Input parameters for determining the search input variant.
   */
  export interface Input {
    /** Whether the viewport is at the XS breakpoint (below SM). */
    isXSBreakpoint: boolean;
    /** The popup variant from the ComboboxPopupDialog context. */
    popupVariant: ComboboxPopupDialogContext.Value["variant"];
  }

  /** The computed variant for the SearchInput component. */
  export type Output = NonNullable<SearchInput.Props["variant"]>;
}

/**
 * Determines the appropriate SearchInput variant based on the popup variant and viewport width.
 *
 * The variant logic:
 * - **drawer popup**: Returns 'borderless' for a seamless drawer experience
 * - **popover popup**: Returns 'default' for a distinct input within the popover
 * - **auto popup**: Returns 'borderless' on XS breakpoint (drawer), 'default' otherwise (popover)
 *
 * @param input - The popup variant and breakpoint information
 * @returns The SearchInput variant that matches the popup's visual style
 *
 * @example
 * ```tsx
 * // Drawer popup always uses borderless
 * determineSearchInputVariant({
 *   isXSBreakpoint: false,
 *   popupVariant: 'drawer'
 * }) // Returns 'borderless'
 *
 * // Popover popup always uses default
 * determineSearchInputVariant({
 *   isXSBreakpoint: true,
 *   popupVariant: 'popover'
 * }) // Returns 'default'
 *
 * // Auto popup adapts to breakpoint
 * determineSearchInputVariant({
 *   isXSBreakpoint: true,
 *   popupVariant: 'auto'
 * }) // Returns 'borderless' (becomes drawer on XS)
 * ```
 */
export function determineSearchInputVariant({
  isXSBreakpoint,
  popupVariant,
}: determineSearchInputVariant.Input): determineSearchInputVariant.Output {
  switch (popupVariant) {
    case "drawer":
      return "borderless";
    case "popover":
      return "default";
    case "auto":
      // XS breakpoint means auto popup will be a drawer
      return isXSBreakpoint ? "borderless" : "default";
  }
}
