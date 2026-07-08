import { ElProgressBarTrack, ElDeterminateProgressBarIndicator } from './styles'

import type { HTMLAttributes } from 'react'

export namespace DeterminateProgressBar {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /** The accessible name of the progress bar. */
    'aria-label': string
    /** The current progress, as a percentage between `0` and `100`. */
    value: number
  }
}

/**
 * Communicates the completion progress of a task that has a known duration or number of steps, such as a
 * file upload or a multi-step form.
 */
export function DeterminateProgressBar({ value, ...rest }: DeterminateProgressBar.Props) {
  const clampedValue = Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0))

  return (
    <ElProgressBarTrack {...rest} role="progressbar" aria-valuenow={clampedValue} aria-valuemin={0} aria-valuemax={100}>
      <ElDeterminateProgressBarIndicator style={{ width: `${clampedValue}%` }} />
    </ElProgressBarTrack>
  )
}
