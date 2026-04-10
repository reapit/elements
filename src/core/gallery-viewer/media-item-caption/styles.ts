import { css } from '@linaria/core'
import { font } from '#src/utils/font'

export const elGalleryViewerMediaItemCaption = css`
  position: absolute;
  bottom: var(--spacing-3);
  left: var(--spacing-3);
  max-width: calc(100% - var(--spacing-3) * 2);
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--border-radius-2xl);
  background: var(--comp-gallery_viewer-colour-fill-caption-light);
  color: var(--comp-gallery_viewer-colour-text-caption-light);
  ${font('sm', 'regular')}
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
