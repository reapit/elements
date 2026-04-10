import { css } from '@linaria/core'

export const elGalleryViewerCarouselLayout = css`
  --gallery-viewer-carousel-layout-sidebar-inline-size: 320px;

  display: flex;
  flex: 1 0 0;
  width: 100%;
  min-height: 0;
  min-width: 0;
  overflow: clip;
`

export const elGalleryViewerCarouselLayoutMain = css`
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  min-width: 0;
  padding-left: var(--spacing-8);
  padding-block: var(--spacing-8);
`

export const elGalleryViewerCarouselLayoutSidebar = css`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: var(--spacing-8);
  height: 100%;
  width: var(--gallery-viewer-carousel-layout-sidebar-inline-size);
  padding: var(--spacing-8);
  overflow-y: auto;
`
