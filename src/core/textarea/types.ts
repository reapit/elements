import type { TextareaHTMLAttributes } from "react";

export type ContentFieldSizing = "content";
export type FixedFieldSizing = "fixed";
/** @deprecated */
export type ManualFieldSizing = "manual";

// NOTE: We omit...
// - `cols`, because our text area should always grow to the width of its container.
// - `rows`, because only one of our text areas allows for fixed sizing.
type AttributesToOmit = "cols" | "rows";

export interface BaseTextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  AttributesToOmit
> {
  /**
   * Determines how the text area will be sized.
   * - `content` will allow the text area to size itself to its content;
   * - `fixed` will size the text area to a specific number of rows;
   * - `manual` **(deprecated)** will allow the user to size the text area themselves.
   */
  fieldSizing: ContentFieldSizing | FixedFieldSizing | ManualFieldSizing;
  /**
   * Whether the control's validity should be visually communicated or not. Typically, validity will only be shown
   * when the control has been touched (i.e. the user has interacted with it).
   */
  showValidity?: boolean;
  /** Font size for the textarea. */
  size?: "small" | "medium" | "large";
}
