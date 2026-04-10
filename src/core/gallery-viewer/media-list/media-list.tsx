import { ElGalleryViewerMediaList } from './styles'
import { GalleryViewerMediaListItem } from './media-list-item'

import type { ComponentProps } from 'react'

export namespace GalleryViewerMediaList {
  export interface ItemProps extends GalleryViewerMediaListItem.Props {}
  export interface Props extends ComponentProps<typeof ElGalleryViewerMediaList> {}
}

/**
 * A list of media items used within a gallery viewer. Renders as a `<ul>` and
 * is intended to contain `GalleryViewer.MediaListItem` components as children.
 */
export function GalleryViewerMediaList({ children, ...rest }: GalleryViewerMediaList.Props) {
  return <ElGalleryViewerMediaList {...rest}>{children}</ElGalleryViewerMediaList>
}

GalleryViewerMediaList.displayName = 'GalleryViewer.MediaList'

GalleryViewerMediaList.Item = GalleryViewerMediaListItem
