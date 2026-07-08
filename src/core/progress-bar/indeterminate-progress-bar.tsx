import { ElProgressBarTrack, ElIndeterminateProgressBarIndicator } from './styles'

import type { HTMLAttributes } from 'react'

export namespace IndeterminateProgressBar {
  export interface Props extends Omit<
    HTMLAttributes<HTMLDivElement>,
    'aria-valuenow' | 'aria-valuemin' | 'aria-valuemax'
  > {
    /** The accessible name of the progress bar. */
    'aria-label': string
  }
}

/**
 * Communicates that a task is in progress when its completion progress or duration cannot be determined,
 * such as while waiting for a server response.
 */
export function IndeterminateProgressBar(props: IndeterminateProgressBar.Props) {
  return (
    <ElProgressBarTrack
      {...props}
      role="progressbar"
      aria-valuenow={undefined}
      aria-valuemin={undefined}
      aria-valuemax={undefined}
    >
      <ElIndeterminateProgressBarIndicator />
    </ElProgressBarTrack>
  )
}
