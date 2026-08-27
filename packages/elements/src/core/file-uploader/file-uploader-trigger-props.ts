import type { FocusEventHandler, KeyboardEventHandler, MouseEventHandler } from "react";

/**
 * Common attributes to omit from `FileInput.Props` when a component embeds a `FileInput` under
 * its own custom trigger: each of `autoFocus`/`onBlur`/`onClick`/`onFocus`/`onKeyDown`/
 * `tabIndex`/`style`/`className` is instead wired onto the visible trigger element (see
 * `FileUploaderTriggerProps`), not the hidden native input.
 */
export type FileUploaderTriggerAttributesToOmit =
  | "autoFocus"
  | "children"
  | "className"
  | "defaultValue"
  | "onBlur"
  | "onClick"
  | "onFocus"
  | "onKeyDown"
  | "style"
  | "tabIndex"
  | "value";

/**
 * Shared trigger prop shape for every `FileUploader` input (`FileUploaderButtonInput`,
 * `FileUploaderDropzoneInput`, `FileUploaderSingleSelectMediaInput`): each renders its own
 * visible, focusable trigger element in place of the native `FileInput`'s hidden input, so these
 * are wired onto that trigger rather than forwarded to `FileInput` itself.
 */
export interface BaseFileUploaderTriggerProps {
  /** Whether the trigger is focused on mount. */
  autoFocus?: boolean;
  /** Called when the trigger is blurred. */
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  /** Called when the trigger is clicked, in addition to opening the file picker. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Called when the trigger is focused. */
  onFocus?: FocusEventHandler<HTMLButtonElement>;
  /** Called on a key down event on the trigger. */
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  /** The trigger's tab order. */
  tabIndex?: number;
}
