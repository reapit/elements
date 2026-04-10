import { css } from '@linaria/core'
import { isWidthAtOrAbove } from '#src/utils/breakpoints'

export const elGalleryViewerMediaListLayout = css`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
  width: 100%;
  padding: var(--spacing-5);

  @container ${isWidthAtOrAbove('SM')} {
    padding: var(--spacing-8);
  }
`
