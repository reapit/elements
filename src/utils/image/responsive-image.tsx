import { cx } from '@linaria/core'
import { elResponsiveImage } from './styles'

import type { ImgHTMLAttributes } from 'react'

export namespace ResponsiveImage {
  export interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'> {
    /**
     * Alternative text for the image.
     *
     * Provide a concise description for informative images. Use an empty string
     * (`""`) for decorative images so assistive technology can ignore them.
     *
     * @see https://www.w3.org/WAI/tutorials/images/decision-tree/
     */
    alt: string
    /**
     * Controls how the image fits within its container. Maps directly to the CSS
     * `object-fit` property. Defaults to `contain`.
     */
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
    /**
     * The URL of the image to display.
     */
    src: string
  }
}

/**
 * A styled `img` element that fills its container. The exact rendering behaviour,
 * including potential cropping or stretching, is controlled by `objectFit`.
 */
export function ResponsiveImage({ className, objectFit = 'contain', ...rest }: ResponsiveImage.Props) {
  return <img {...rest} className={cx(elResponsiveImage, className)} data-object-fit={objectFit} />
}
