import { css } from '@linaria/core'

export const elGalleryViewerMediaItem = css`
  @layer elements.main {
    flex: 0 0 100%;
    position: relative;
    margin: 0;
    padding: 0;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
`
