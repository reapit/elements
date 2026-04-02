import { ElGalleryViewerMediaListItem } from './styles'
import { GalleryViewerMediaItem } from '../media-item'

export namespace GalleryViewerMediaListItem {
  export interface Props extends GalleryViewerMediaItem.Props {}
}

/**
 * A thin wrapper around `GalleryViewerMediaItem` that ensures it is contained
 * within a list item (`<li>`) for correct semantics when used with
 * `GalleryViewerMediaList`. The list item applies `--border-radius-l` corner
 * rounding and clips overflowing media content.
 *
 * All props are passed through to `GalleryViewerMediaItem`.
 */
export function GalleryViewerMediaListItem(props: GalleryViewerMediaListItem.Props) {
  return (
    <ElGalleryViewerMediaListItem>
      <GalleryViewerMediaItem {...props} />
    </ElGalleryViewerMediaListItem>
  )
}

GalleryViewerMediaListItem.displayName = 'GalleryViewer.MediaListItem'
