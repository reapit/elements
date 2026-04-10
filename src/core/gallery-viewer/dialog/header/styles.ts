import { css } from '@linaria/core'
import { font } from '#src/utils/font'
import { isWidthAtOrAbove } from '#src/utils/breakpoints'

export const elGalleryViewerDialogHeader = css`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: var(--spacing-2);

  height: var(--size-14);
  padding: 0 var(--spacing-2) 0 var(--spacing-5);
  background: var(--colour-fill-white);
  border-bottom: var(--border-width-default) solid var(--colour-border-neutral-light-default);

  @container ${isWidthAtOrAbove('SM')} {
    padding-left: var(--spacing-8);
  }
`

export const elGalleryViewerDialogHeaderTitle = css`
  flex: 1 1 auto;
  ${font('base', 'bold')}
  color: var(--colour-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const elGalleryViewerDialogHeaderAction = css`
  display: flex;
`
