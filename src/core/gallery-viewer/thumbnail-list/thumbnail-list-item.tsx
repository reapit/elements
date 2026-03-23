import { ElGalleryViewerThumbnailListItem } from './styles'
import { GalleryViewerThumbnail } from '../thumbnail'

export namespace GalleryViewerThumbnailListItem {
  export interface Props extends GalleryViewerThumbnail.Props {}
}

/**
 * A thin wrapper around `GalleryViewerThumbnail` that ensures it is contained
 * within a list item (`<li>`) for correct semantics and accessibility when used
 * with `GalleryViewerThumbnailList`.
 *
 * All props are passed through to `GalleryViewerThumbnail`.
 */
export function GalleryViewerThumbnailListItem(props: GalleryViewerThumbnailListItem.Props) {
  return (
    <ElGalleryViewerThumbnailListItem>
      <GalleryViewerThumbnail {...props} />
    </ElGalleryViewerThumbnailListItem>
  )
}

GalleryViewerThumbnailListItem.displayName = 'GalleryViewer.Thumbnail'
