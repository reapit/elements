import { cx } from '@linaria/core'
import {
  elGalleryViewerThumbnail,
  ElGalleryViewerThumbnailVideoOverlay,
  ElGalleryViewerThumbnailPlayIcon,
} from './styles'
import { Image } from '#src/utils/image'
import PlayIcon from './play.svg?react'
import { PropertyIcon } from '#src/icons/property'

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export namespace GalleryViewerThumbnailBase {
  export interface CommonProps {
    /**
     * The fallback UI displayed when the image src fails to load. Typically an Image.Fallback.
     */
    fallback?: ReactNode
    /**
     * The URL of the image to display in the thumbnail.
     */
    src: string
    /**
     * Whether the thumbnail represents a video. When true, a play icon overlay
     * is displayed over the image.
     */
    isVideo?: boolean
  }

  export interface AsAnchorProps extends CommonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
    as: 'a'
    /**
     * The accessible name of the thumbnail. Should be action-oriented, not simply a description of
     * the thumbnail's image.
     */
    'aria-label': string
    /**
     * Indicates whether this thumbnail represents the currently selected item.
     * Pass `"page"` when selected, `false` otherwise.
     */
    'aria-current': 'page' | false
    /** The URL this thumbnail navigates to when activated. */
    href: string
  }

  export interface AsButtonProps extends CommonProps, ButtonHTMLAttributes<HTMLButtonElement> {
    as: 'button'
    /**
     * The accessible name of the thumbnail. Should be action-oriented, not simply a description of
     * the thumbnail's image.
     */
    'aria-label': string
    /**
     * Indicates whether this thumbnail is currently selected.
     */
    'aria-pressed': boolean
  }

  export type Props = AsAnchorProps | AsButtonProps
}

/**
 * An internal polymorphic base for `GalleryViewerThumbnail` and
 * `GalleryViewerThumbnailButton`. Not intended for direct use by consumers.
 */
export function GalleryViewerThumbnailBase({
  as: Element,
  className,
  fallback,
  isVideo,
  src,
  ...rest
}: GalleryViewerThumbnailBase.Props) {
  return (
    // NOTE: we use a type assertion here to avoid the hassle of narrowing `rest` properly
    <Element {...(rest as HTMLAttributes<HTMLElement>)} className={cx(elGalleryViewerThumbnail, className)}>
      {/* NOTE: we pin alt="" to make the image decorative because we want the parent's aria-label to be the
       * only thing that's read. We also want the image to fill its container. */}
      <Image alt="" fallback={fallback ?? defaultFallback} height="100%" objectFit="cover" src={src} width="100%" />
      {isVideo && (
        <ElGalleryViewerThumbnailVideoOverlay data-testid="video-overlay">
          <ElGalleryViewerThumbnailPlayIcon>
            <PlayIcon aria-hidden />
          </ElGalleryViewerThumbnailPlayIcon>
        </ElGalleryViewerThumbnailVideoOverlay>
      )}
    </Element>
  )
}

const defaultFallback = <Image.Fallback icon={<PropertyIcon size="sm" />} />
