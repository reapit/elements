import { cx } from '@linaria/core'
import { elImageFallback, elImageFallbackContent, elImageFallbackMessage } from './styles'

import type { HTMLAttributes, ReactNode } from 'react'

export namespace ImageFallback {
  export interface Props extends HTMLAttributes<HTMLDivElement> {
    /**
     * Message content shown in the fallback UI.
     *
     * @default The image could not be loaded
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
      <div className={elImageFallbackContent}>
        {icon}
        <p className={elImageFallbackMessage}>{children ?? 'The image could not be loaded'}</p>
      </div>
    </div>
  )
}

ImageFallback.displayName = 'Image.Fallback'
