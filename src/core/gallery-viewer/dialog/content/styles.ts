import { css } from '@linaria/core'
import { isWidthAtOrAbove } from '#src/utils/breakpoints'

export const elGalleryViewerDialogContent = css`
  padding: var(--spacing-5);
  background: var(--colour-fill-white);
  color: var(--colour-text-primary);

  @container ${isWidthAtOrAbove('SM')} {
    padding: var(--spacing-8);
  }
`
