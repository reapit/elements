import { ElGalleryViewerThumbnailList } from './styles'
import { GalleryViewerThumbnailListItem } from './thumbnail-list-item'
import { GalleryViewerThumbnailListButtonItem } from './thumbnail-list-button-item'

import type { ComponentProps } from 'react'

export namespace GalleryViewerThumbnailList {
  export interface Props extends ComponentProps<typeof ElGalleryViewerThumbnailList> {}
}

/**
 * A list of thumbnails used within a gallery viewer. Renders as a `<ul>` and
 * is intended to contain `GalleryViewerThumbnailList.Item` or
 * `GalleryViewerThumbnailList.ButtonItem` components as children.
 *
 * Does not render a `<nav>` landmark — consumers using anchor-based items
 * should wrap this component in a `<nav aria-label="…">` themselves.
 */
export function GalleryViewerThumbnailList({ children, ...rest }: GalleryViewerThumbnailList.Props) {
  return <ElGalleryViewerThumbnailList {...rest}>{children}</ElGalleryViewerThumbnailList>
}

GalleryViewerThumbnailList.displayName = 'GalleryViewerThumbnailList'

GalleryViewerThumbnailList.Item = GalleryViewerThumbnailListItem
GalleryViewerThumbnailList.ButtonItem = GalleryViewerThumbnailListButtonItem
