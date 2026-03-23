import { ElGalleryViewerThumbnailListItem } from './styles'
import { GalleryViewerThumbnailButton } from '../thumbnail'

export namespace GalleryViewerThumbnailListButtonItem {
  export interface Props extends GalleryViewerThumbnailButton.Props {}
}

/**
 * A thin wrapper around `GalleryViewerThumbnailButton` that ensures it is
 * contained within a list item (`<li>`) for correct semantics and accessibility
 * when used with `GalleryViewerThumbnailList`.
 *
 * All props are passed through to `GalleryViewerThumbnailButton`.
 */
export function GalleryViewerThumbnailListButtonItem(props: GalleryViewerThumbnailListButtonItem.Props) {
  return (
    <ElGalleryViewerThumbnailListItem>
      <GalleryViewerThumbnailButton {...props} />
    </ElGalleryViewerThumbnailListItem>
  )
}

GalleryViewerThumbnailListButtonItem.displayName = 'GalleryViewer.ThumbnailButton'
