import { cx } from '@linaria/core'
import { elResponsiveImage } from './styles'

import type { CSSProperties, ImgHTMLAttributes } from 'react'

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
     * The image's height as a CSS length string (e.g. `"200px"`, `"100%"`).
     * Sets the `--image-height` CSS custom property on the element.
     * @default 'auto'
     */
    height?: string
    /**
     * Controls how the image fits within its container. Maps directly to the CSS
     * `object-fit` property. Defaults to `contain`.
     */
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
    /**
     * The URL of the image to display.
     */
    src: string
    /**
     * The image's width as a CSS length string (e.g. `"300px"`, `"100%"`).
     * Sets the `--image-width` CSS custom property on the element.
     * @default 100%
     */
    width?: string
  }
}

/**
 * A styled `img` element that fills its container. The exact rendering behaviour,
 * including potential cropping or stretching, is controlled by `objectFit`.
 */
export function ResponsiveImage({ className, height, objectFit = 'contain', width, ...rest }: ResponsiveImage.Props) {
  // NOTE: Use CSS variables for the width and height. This allows ResponsiveImage to either inherit the
  // size defined by Image or be used independently of Image.
  const cssVariableStyles = {
    ...(width !== undefined && { '--image-width': width }),
    ...(height !== undefined && { '--image-height': height }),
  } as CSSProperties

  return (
    <img
      {...rest}
      className={cx(elResponsiveImage, className)}
      data-object-fit={objectFit}
      style={{ ...rest.style, ...cssVariableStyles }}
    />
  )
}
