import { cx } from '@linaria/core'
import { elMediaFallback, elMediaFallbackIcon, elMediaFallbackMessage } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace MediaFallback {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Optional message content shown below the icon. When omitted, no message is rendered.
     */
    children?: ReactNode

    /**
     * Optional icon rendered above the message.
     */
    icon?: ReactNode
  }
}

/**
 * Shared fallback UI shown when a media element (image or video) cannot be loaded.
 */
export function MediaFallback({ children, className, icon, ...rest }: MediaFallback.Props) {
  return (
    <div {...rest} className={cx(elMediaFallback, className)}>
      {icon && (
        <div aria-hidden className={elMediaFallbackIcon}>
          {icon}
        </div>
      )}
      {children && <p className={elMediaFallbackMessage}>{children}</p>}
    </div>
  )
}

MediaFallback.displayName = 'MediaFallback'
