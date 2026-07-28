import type { HTMLAttributes } from "react";

import {
  ElProgressIndicatorTrack,
  ElDeterminateProgressIndicatorFill,
  ElIndeterminateProgressIndicatorFill,
} from "./styles";

// NOTE: We omit...
// - role, aria-valuenow, aria-valuemin, and aria-valuemax, because the component always sets these itself.
// - children, because the component always renders its own fill element.
type AttributesToOmit = "role" | "aria-valuenow" | "aria-valuemin" | "aria-valuemax" | "children";

export namespace ProgressIndicator {
  export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, AttributesToOmit> {
    /** The accessible name of the progress indicator. */
    "aria-label": string;
    /** The current progress, as a percentage between `0` and `100`. Omit for an indeterminate indicator. */
    value?: number;
  }
}

/**
 * Communicates the progress of a task. Pass `value` to communicate the completion progress of a task that
 * has a known duration or number of steps, such as a file upload or a multi-step form. Omit `value` to
 * communicate that a task is in progress when its completion progress or duration cannot be determined,
 * such as while waiting for a server response.
 */
export function ProgressIndicator({ value, ...rest }: ProgressIndicator.Props) {
  if (value === undefined) {
    return (
      <ElProgressIndicatorTrack
        {...rest}
        role="progressbar"
        aria-valuenow={undefined}
        aria-valuemin={undefined}
        aria-valuemax={undefined}
      >
        <ElIndeterminateProgressIndicatorFill />
      </ElProgressIndicatorTrack>
    );
  }

  const clampedValue = Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0));

  return (
    <ElProgressIndicatorTrack
      {...rest}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <ElDeterminateProgressIndicatorFill style={{ width: `${clampedValue}%` }} />
    </ElProgressIndicatorTrack>
  );
}
