import { cx } from '@linaria/core'
import { elImageFallback, elImageFallbackIcon, elImageFallbackMessage } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace ImageFallback {
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
 * Default fallback UI shown when an image cannot be loaded.
 */
export function ImageFallback({ children, className, icon, ...rest }: ImageFallback.Props) {
  return (
    <div {...rest} className={cx(elImageFallback, className)}>
      {icon && (
        <div aria-hidden className={elImageFallbackIcon}>
          {icon}
        </div>
      )}
      {children && <p className={elImageFallbackMessage}>{children}</p>}
    </div>
  )
}

ImageFallback.displayName = 'Image.Fallback'
